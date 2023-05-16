import { sessionList } from '@stores/session';
import type { Session } from '../types/extension';
import { initDB, loadDB, removeDB, saveDB } from './storage';
import log from './log';
import { sessions } from 'webextension-polyfill';

export function initSessions() {
  initDB('sessions', (sessions) => {
    sessionList.set(sessions);
    log.info('initSessions(): loaded sessions');
  });
}

export function loadSessions() {
  loadDB('sessions', (sessions) => {
    sessionList.set(sessions);
    log.info('loadSessions(): loaded sessions');
  });
}

export function saveSession(session: Session) {
  return saveDB('sessions', session, () => {
    sessionList.update((sessions) => {
      sessions.push(session);
      return sessions;
    });
  });
}

export function removeSession(data) {
  removeDB('sessions', data, () => {
    log.info('removeSession(): inside removeDB()');
    sessionList.update((sessions) =>
      sessions.filter((session) => data.id !== session.id)
    );
    log.info('removeSession(): finished');
  });
}
