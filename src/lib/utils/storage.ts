import log from './log';

let db: IDBDatabase;

export function initDB(store: string, callback: (result: any[]) => any) {
  const DBOpenRequest = indexedDB.open(store, 1.0);

  DBOpenRequest.onsuccess = () => {
    log.info('initDB(): Database initialised');
    db = DBOpenRequest.result;

    loadDB(store, callback);
  };

  DBOpenRequest.onupgradeneeded = () => {
    db = DBOpenRequest.result;

    const objectStore = db.createObjectStore(store, { keyPath: 'id' });

    objectStore.createIndex('title', 'title', { unique: false });
    //objectStore.createIndex('windows', 'windowsObj', { unique: false });

    log.info('initDB(): Created object store');
  };

  DBOpenRequest.onerror = () => {
    log.error('initDB(): Error:', DBOpenRequest.error);
  };
}

export function saveDB(store: string, data: any, callback) {
  log.info('saveDB(): inside');

  const req = getObjectStore(store, 'readwrite').add(data);
  req.onsuccess = (e) => {
    log.info('saveDB(): Saved data successfully');
    callback(e);
  };

  req.onerror = (e) => {
    log.error('saveDB(): Error adding data');
  };

  return req;
}

export function loadDB(store: string, callback: (result: any[]) => any) {
  log.info('loadDB(): inside');

  const req = getObjectStore(store, 'readonly').getAll();

  req.transaction.oncomplete = () => {};

  req.onsuccess = (event) => {
    callback((event.target as IDBRequest<any>).result);
  };

  req.onerror = (e) => {
    log.error('loadDB(): Error loading data');
  };
}

export function removeDB(store: string, key, callback) {
  log.info('removeDb(): inside');

  const req = getObjectStore(store, 'readwrite').delete(key);

  req.onsuccess = (event) => {
    log.info('removeDB(): success');
    callback(event);
  };

  req.onerror = (event) => {
    log.info('removeDB(): Error removing data');
  };
}

function getObjectStore(store: string, mode?: IDBTransactionMode) {
  return db.transaction(store, mode).objectStore(store);
}
