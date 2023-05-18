import { currentSession, selectedSession, sessionList } from '@stores/session';
import { sessionsDB } from './database';
import type { Session } from '../types/extension';

export async function loadSessions(count?: number) {
  sessionList.set(await sessionsDB.loadSessions(null, count));
}

export async function filterSessions(query: string) {
  sessionList.set(await sessionsDB.filterSessions(query));
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
}
