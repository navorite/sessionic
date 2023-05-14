import browser from 'webextension-polyfill';
import type { Session } from '../types/extension';

export async function saveSession(session: Session) {
  return browser?.storage?.local?.set(session);
}
