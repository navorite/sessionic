import {
  openDB,
  type DBSchema,
  type IDBPDatabase,
  type IDBPTransaction,
  type StoreNames,
} from 'idb/with-async-ittr';
import type { UUID } from 'crypto';
import log from './log';

interface DB extends DBSchema {
  sessions: {
    value: ESession;
    key: UUID;
    indexes: { title: string; dateSaved: number };
  };
}

class SessionsDB {
  private db: IDBPDatabase<DB>;
  private open = false;
  private version = 1;

  async initDB() {
    if (this.open) return;

    log.info('initDB(): init');

    this.db = await openDB<DB>('sessions', this.version, {
      upgrade: this.upgradeSessions,
    });

    this.open = true;
  }

  async loadSessions(query?: number | IDBKeyRange, count?: number) {
    log.info('loadSessions(): init');

    if (!this.open) await this.initDB();

    return this.db.getAllFromIndex('sessions', 'dateSaved', query, count);
  }

  async saveSession(session: ESession) {
    log.info('saveSession(): init');

    if (!this.open) await this.initDB();
    return this.db.add('sessions', session);
  }

  async updateSession(session: ESession) {
    log.info('updateSession(): init');

    if (!this.open) await this.initDB();

    return this.db.put('sessions', session);
  }

  async saveSessions(sessions: ESession[]) {
    if (!this.open) await this.initDB();
    const tx = this.db.transaction('sessions', 'readwrite');

    for (const session of sessions) {
      tx.store.add(session);
    }
  }

  async deleteSession(session: ESession) {
    log.info('deleteSession(): init');

    if (!this.open) await this.initDB();
    return this.db.delete('sessions', session.id as UUID);
  }

  async deleteSessions() {
    log.info('deleteSessions(): init');

    if (!this.open) await this.initDB();
    return this.db.clear('sessions');
  }

  upgradeSessions(
    db: IDBPDatabase<DB>,
    oldVersion: number,
    newVersion: number,
    transaction: IDBPTransaction<
      DB,
      ArrayLike<StoreNames<DB>>,
      'versionchange'
    >,
    event: IDBVersionChangeEvent
  ) {
    log.info(
      `upgradeSession(): init: version: ${newVersion}, old: ${oldVersion}`
    );

    if (newVersion === 1) {
      const sessionsStore = db.createObjectStore('sessions', {
        keyPath: 'id',
      });

      sessionsStore.createIndex('title', 'title', { unique: false });
      sessionsStore.createIndex('dateSaved', 'dateSaved', { unique: false });
    }
  }
}

export const sessionsDB = new SessionsDB();
