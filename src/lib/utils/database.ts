import {
	openDB,
	type DBSchema,
	type IDBPDatabase,
	type IDBPTransaction,
	type StoreNames
} from 'idb/with-async-ittr';
import type { UUID } from 'crypto';
import type { ESession, EWindow } from '@/lib/types';
import { log } from '@/lib/utils';

interface DB extends DBSchema {
	sessions: {
		value: ESession;
		key: UUID;
		indexes: { title: string; dateSaved: number };
	};
}

class SessionsDB {
	private static instance: SessionsDB;
	private db!: IDBPDatabase<DB>;
	private open = false;
	private version = 1;

	constructor() {
		if (!SessionsDB.instance) SessionsDB.instance = this;

		return SessionsDB.instance;
	}

	async initDB() {
		if (this.open) {
			log.debug('[db.initDB[] already open');
			return;
		}

		log.info('[db.initDB] init');

		this.db = await openDB<DB>('sessions', this.version, {
			upgrade: this.upgradeSessions
		});

		this.open = true;

		this.db.onclose = () => log.info('[db.initDB] closing db');

		this.db.onerror = () => log.error('[db.initDB] error in db: ', this.db);

		this.db.onabort = () =>
			log.error('[db.initDB]: aborted transactions in db: ', this.db);
	}

	async loadSessions(query?: number | IDBKeyRange, count?: number) {
		log.info('[db.loadSessions] init');

		await this.initDB();

		return this.db.getAllFromIndex('sessions', 'dateSaved', query, count);
	}

	async lazyLoadSessions(
		query?: number | IDBKeyRange,
		direction?: IDBCursorDirection
	) {
		log.info('[db.lazyLoadSessions] init');

		const sessions: ESession[] = [];

		await this.initDB();

		const tx = this.db.transaction('sessions').store.index('dateSaved');

		for await (const cursor of tx.iterate(query, direction)) {
			const { dateModified, dateSaved, id, title, tabsNumber, windows } =
				cursor.value;

			sessions.push({
				dateModified,
				dateSaved,
				id,
				title,
				tabsNumber,
				windows: { length: windows.length } as EWindow[]
			});
		}

		return sessions;
	}

	async loadSessionWindows(id: UUID) {
		log.info('[db.loadSession] init');

		await this.initDB();

		return (await this.db.get('sessions', id))?.windows;
	}

	async saveSession(session: ESession) {
		log.info('[db.saveSession] init');

		await this.initDB();

		return this.db.add('sessions', session);
	}

	async saveSessions(sessions: ESession[]) {
		log.info('[db.saveSessions] init');

		await this.initDB();

		const tx = this.db.transaction('sessions', 'readwrite');

		return new Promise<void>((resolve, reject) => {
			for (const session of sessions) {
				tx.store.add(session);
			}

			tx.oncomplete = () => {
				log.info('[db.saveSessions] saved batch sessions: ', sessions);
				resolve();
			};

			tx.onerror = () => {
				log.error('[db.saveSessions] error saving sessions: ', sessions);
				reject();
			};

			tx.onabort = () => {
				log.error('[db.saveSessions] aborted saving sessions: ', sessions);
				reject();
			};
		});
	}

	async updateSession(session: ESession) {
		log.info('[db.updateSession] init');

		await this.initDB();

		return this.db.put('sessions', session);
	}

	async deleteSession(session: ESession) {
		log.info('[db.deleteSession] init');

		await this.initDB();

		return this.db.delete('sessions', session.id as UUID);
	}

	async deleteSessions() {
		log.info('[db.deleteSessions] init');

		await this.initDB();

		return this.db.clear('sessions');
	}

	upgradeSessions(
		db: IDBPDatabase<DB>,
		oldVersion: number,
		newVersion: number,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		transaction: IDBPTransaction<
			DB,
			ArrayLike<StoreNames<DB>>,
			'versionchange'
		>,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		event: IDBVersionChangeEvent
	) {
		log.info(
			`[db.upgradeSession] init - version: ${newVersion}, old: ${oldVersion}`
		);

		if (newVersion === 1) {
			log.info('[db.upgradeSession] creating object store');

			const sessionsStore = db.createObjectStore('sessions', {
				keyPath: 'id'
			});

			sessionsStore.createIndex('title', 'title', { unique: false });
			sessionsStore.createIndex('dateSaved', 'dateSaved', { unique: false });
		}
	}
}

export const sessionsDB = new SessionsDB();
