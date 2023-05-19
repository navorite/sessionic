import { currentSession, selectedSession, sessionList } from '@stores/session';
import { sessionsDB } from './database';
import type { Session } from '../types/extension';
import { get } from 'svelte/store';

export async function loadSessions(count?: number) {
  sessionList?.set({
    unfilteredSessions: await sessionsDB.loadSessions(count),
  });
}

export function filterSessions(query: string) {
  sessionList?.update((sessions) => {
    if (sessions?.unfilteredSessions?.length) {
      sessions.filteredSessions = sessions?.unfilteredSessions?.filter(
        (session) => session?.title?.includes(query)
      );
    }

    return sessions;
  });
}

export async function saveSession(session: Session) {
  await sessionsDB.saveSession(session);

  sessionList?.update((sessions) => {
    sessions?.unfilteredSessions?.push(session);
    return sessions;
  });

  selectedSession?.set(session);
}

export async function removeSession(target: Session) {
  await sessionsDB.removeSession(target);

  sessionList.update((sessions) => {
    sessions.unfilteredSessions = sessions?.unfilteredSessions?.filter(
      (session) => session.id !== target.id
    );

    return sessions;
  });

  selectedSession?.set(get(currentSession));
}
