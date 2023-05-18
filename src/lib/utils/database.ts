import { openDB, type DBSchema, type IDBPDatabase } from 'idb/with-async-ittr';
import type { Session } from '../types/extension';
import type { UUID } from 'crypto';
import log from './log';

interface DB extends DBSchema {
  sessions: {
    value: Session;
    key: UUID;
    indexes: { title: string; dateSaved: number };
  };
}

class SessionsDB {
  private db: IDBPDatabase<DB>;
  private open: boolean = false;

  async initDB() {
    if (this.open) return;

    log.info('initDB(): init');

    this.db = await openDB<DB>('sessions', 1, {
      upgrade: (db) => {
        log.info('initDB(): upgrade');

        const sessionsStore = db.createObjectStore('sessions', {
          keyPath: 'id',
        });

        sessionsStore.createIndex('title', 'title', { unique: false });
        sessionsStore.createIndex('dateSaved', 'dateSaved', { unique: false });
      },
    });

    this.open = true;
  }

  async saveSession(session: Session) {
    if (!this.open) await this.initDB();
    return this.db.add('sessions', session);
  }

  async removeSession(session: Session) {
    if (!this.open) await this.initDB();
    return this.db.delete('sessions', session.id);
  }

  async loadSessions() {
    if (!this.open) await this.initDB();
    return this.db.getAllFromIndex('sessions', 'dateSaved');
  }
}

export const sessionsDB = new SessionsDB();
