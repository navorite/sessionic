import type { Session } from '../types/extension';
import log from './log';

let db: IDBDatabase;
let DBOpenRequest: IDBOpenDBRequest;

export function initDB(store: string, callback: (result: any[]) => any) {
  DBOpenRequest = indexedDB.open(store, 1.0);

  DBOpenRequest.onsuccess = () => {
    log.info('InitDB() Database initialised');
    db = DBOpenRequest.result;

    loadDB(store, callback);
  };

  DBOpenRequest.onupgradeneeded = () => {
    db = DBOpenRequest.result;

    const objectStore = db.createObjectStore(store, {
      autoIncrement: true,
    });

    objectStore.createIndex('title', 'title', { unique: false });
    //objectStore.createIndex('windows', 'windowsObj', { unique: false });

    log.info('InitDB() Created object store');
  };

  DBOpenRequest.onerror = () => {
    log.error('InitDB() Error:', DBOpenRequest.error);
  };
}

export function saveDB(store: string, data: any) {
  const req = getObjectStore(store, 'readwrite').add(data);
  req.onsuccess = () => {
    log.info('saveDB() saved data successfully');
  };

  return req;
}

export function loadDB(store: string, callback: (result: any[]) => any) {
  log.info('loadDB() init');

  const req = getObjectStore(store, 'readonly').getAll();

  req.transaction.oncomplete = () => {};
  req.onsuccess = (event) => {
    callback((event.target as IDBRequest<any>).result);
  };
}

export function removeDB(store: string, data) {
  log.info('removeDb() init');

  const req = getObjectStore(store, 'readwrite').delete(data);
  req.onsuccess = (event) => {
    log.info('removeDb() success');
  };
  req.onerror = (event) => {
    log.info('removeDb() error');
  };
}

export function getObjectStore(store: string, mode?: IDBTransactionMode) {
  return db.transaction(store, mode).objectStore(store);
}
