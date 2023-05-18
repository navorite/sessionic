import { currentSession, selectedSession, sessionList } from '@stores/session';
import { sessionsDB } from './database';
import type { Session } from '../types/extension';
import log from './log';

export async function loadSessions() {
  sessionList.set(await sessionsDB.loadSessions());
}

export async function saveSession(session: Session) {
  await sessionsDB.saveSession(session);

  sessionList.update((sessions) => {
    sessions.push(session);
    return sessions;
  });

  selectedSession.set(session);
}

export async function removeSession(target: Session) {
  await sessionsDB.removeSession(target);

  sessionList.update((sessions) =>
    sessions.filter((session) => session.id !== target.id)
  );

  currentSession.subscribe((session) => selectedSession.set(session));

  log.info('removeSession(): end');
}
