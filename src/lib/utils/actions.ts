import type { Session } from '../types/extension';
import { loadDB, removeDB, saveDB } from './storage';

export function saveSession(session: Session) {
  return saveDB('sessions', session);
}

export function loadSessions(callback) {
  loadDB('sessions', callback);
}

export function removeSession(data) {
  removeDB('sessions', data);
}
