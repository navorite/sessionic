import { writable, type Writable } from 'svelte/store';
import type { Session, Sessions } from '../types/extension';
import { sessionsDB } from '@utils/database';
import { getCurrentSession } from '@utils/browser';
import { selected } from '@components/Sessions/SessionItem.svelte';

export const sessions = (() => {
  const { subscribe, update }: Writable<Sessions> = writable();

  return {
    subscribe,

    async load(count?: number) {
      const result = await sessionsDB.loadSessions(count);

      update((sessions) => {
        return { ...sessions, Sessions: result };
      });
    },

    async add(session: Session) {
      await sessionsDB.saveSession(session);

      update((sessions) => {
        sessions.filtered.push(session);
        return sessions;
      });
    },

    async remove(target: Session) {
      await sessionsDB.removeSession(target);

      update((sessions) => {
        sessions.unfiltered = sessions.unfiltered.filter(
          (session) => session.id !== target.id
        );

        return sessions;
      });
    },

    search(query: string) {
      update((sessions) => {
        if (sessions?.unfiltered) {
          sessions.filtered = sessions?.unfiltered?.filter((session) =>
            session?.title?.includes(query)
          );

          return sessions;
        }
      });
    },
  };
})();

export const currentSession = (() => {
  const { subscribe, set }: Writable<Session> = writable();

  getCurrentSession().then((session) => {
    set(session);
    selected.set(session);
  });

  return {
    subscribe,
    async load() {
      set(await getCurrentSession());
    },
  };
})();
