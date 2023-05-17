import log from './log';

let isOpen: boolean = false;
let db: IDBDatabase;

export async function initDB(store: string, version?: number) {
  return new Promise(
    (resolve: (db: IDBDatabase) => any, reject: (ev: Event) => any) => {
      if (isOpen) return;
      const DBOpenRequest = indexedDB.open(store, version);

      DBOpenRequest.onsuccess = (ev) => {
        isOpen = true;
        db = (ev.target as IDBOpenDBRequest).result;

        log.info('initDB(): success');

        db.onclose = () => {
          log.info('initDB(): closing DB');
          isOpen = false;
        };

        resolve(db);
      };

      DBOpenRequest.onupgradeneeded = (ev) => {
        log.info('initDB(): upgrade');

        db = (ev.target as IDBOpenDBRequest).result;

        const objectStore = db.createObjectStore(store, { keyPath: 'id' });

        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('dateSaved', 'dateSaved', { unique: false });
        //objectStore.createIndex('windows', 'windowsObj', { unique: false });

        log.info('initDB(): created object store');
      };

      DBOpenRequest.onerror = (ev) => {
        log.error('initDB(): error:', (ev.target as IDBOpenDBRequest).error);
        reject(ev);
      };
    }
  );
}

export async function addToDB(store: string, data: any, key?: IDBValidKey) {
  log.info('saveDB(): init');

  const req = (await getObjectStore(store, 'readwrite')).add(data, key);

  return new Promise(
    (resolve: (req: Event) => any, reject: (ev: Event) => any) => {
      req.onsuccess = (ev) => {
        log.info('addToDB(): saved data successfully');
        resolve(ev);
      };

      req.onerror = (ev) => {
        log.error('addToDB(): error adding data', ev);
        reject(ev);
      };
    }
  );
}

export async function loadDB(
  store: string,
  index: string,
  query?: IDBValidKey | IDBKeyRange,
  count?: number
) {
  log.info('loadSessionsDB(): init');

  const req = (await getObjectStore(store, 'readonly'))
    .index(index)
    .getAll(query, count);

  return new Promise(
    (resolve: (values: any) => any, reject: (ev: Event) => any) => {
      req.onsuccess = (ev) => {
        resolve((ev.target as IDBRequest<any>).result);
      };

      req.onerror = (ev) => {
        log.error('loadDBCursor(): error loading data', ev);
        reject(ev);
      };
    }
  );
}

export async function loadDBCursor(
  store: string,
  index: string,
  query?: IDBValidKey | IDBKeyRange,
  direction?: IDBCursorDirection
) {
  log.info('loadSessionsDB(): init');

  const req = (await getObjectStore(store, 'readonly'))
    .index(index)
    .openCursor(query, direction);

  return new Promise(
    (resolve: (values: any) => any, reject: (ev: Event) => any) => {
      const values: any = [];
      req.onsuccess = (ev) => {
        const cursor = (ev.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          values.push(cursor.value);
          cursor.continue();
        } else {
          resolve(values);
        }
      };

      req.onerror = (ev) => {
        log.error('loadDBCursor(): error loading data', ev);
        reject(ev);
      };
    }
  );
}

export async function removeDB(store: string, key: IDBValidKey | IDBKeyRange) {
  log.info('removeDb(): init');

  const req = (await getObjectStore(store, 'readwrite')).delete(key);

  return new Promise(
    (resolve: (ev: Event) => any, reject: (ev: Event) => any) => {
      req.onsuccess = (ev) => {
        log.info('removeDB(): success');
        resolve(ev);
      };

      req.onerror = (ev) => {
        log.info('removeDB(): error removing data', ev);
        reject(ev);
      };
    }
  );
}

async function getObjectStore(store: string, mode?: IDBTransactionMode) {
  if (!isOpen) {
    log.info('getObjectStore(): loading DB');

    db = await initDB(store);
  }

  return db.transaction(store, mode).objectStore(store);
}
