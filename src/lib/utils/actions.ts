import { sessionList, selectedSession, currentSession } from '@stores/session';
import type { Session } from '../types/extension';
import { addToDB, initDB, loadDB, loadDBCursor, removeDB } from './storage';
import log from './log';

export async function initSessions(version?: number) {
  return initDB('sessions', version);
}

export async function loadSessions(
  query?: IDBValidKey | IDBKeyRange,
  count?: number
) {
  sessionList.set(await loadDB('sessions', 'dateSaved', query, count));
}

export async function saveSession(session: Session) {
  const ev = await addToDB('sessions', session);

  if (ev.type === 'error') return;

  sessionList.update((sessions) => {
    sessions.push(session);
    return sessions;
  });

  selectedSession.set(session);
}

export async function removeSession(key: IDBValidKey | IDBKeyRange) {
  const ev = await removeDB('sessions', key);

  if (ev.type === 'error') return;

  sessionList.update((sessions) =>
    sessions.filter((session) => session.id !== key)
  );

  currentSession.subscribe((session) => selectedSession.set(session));
  log.info('removeSession(): finished');
}
