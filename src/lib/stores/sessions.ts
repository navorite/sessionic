import { writable, type Writable } from 'svelte/store';
import type { Session } from '../types/extension';
import { sessionsDB } from '@utils/database';
import { getCurrentSession } from '@utils/browser';
import { selected } from '@components/Sessions/SessionItem.svelte';

export const sessions = (() => {
  const { subscribe, set, update }: Writable<Session[]> = writable();

  return {
    subscribe,

    async load(count?: number) {
      set(await sessionsDB.loadSessions(count));
    },

    async add(session: Session) {
      await sessionsDB.saveSession(session);

      update((sessions) => {
        sessions.push(session);
        return sessions;
      });
    },

    async remove(target: Session) {
      update((sessions) => {
        sessions = sessions.filter((session) => session.id !== target.id);

        return sessions;
      });

      await sessionsDB.removeSession(target);
    },

    filter(query: string) {
      let filtered: Session[];

      const unsubscribe = subscribe((sessions) => {
        filtered = sessions?.filter?.((session) =>
          session?.title?.includes(query)
        );
      });

      unsubscribe();

      return filtered;
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
