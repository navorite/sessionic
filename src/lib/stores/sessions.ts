import { writable, type Writable } from 'svelte/store';
import type { Session } from '../types/extension';
import { sessionsDB } from '@utils/database';
import { getSession } from '@utils/browser';

export const sessions = (() => {
  const { subscribe, set, update }: Writable<Session[]> = writable();

  async function load(count?: number) {
    set(await sessionsDB.loadSessions(count));
  }

  async function add(session: Session) {
    await sessionsDB.saveSession(session);

    update((sessions) => {
      sessions.push(session);
      return sessions;
    });
  }

  async function remove(target: Session) {
    update((sessions) => {
      const index = sessions.indexOf(target);

      if (index > -1) sessions.splice(index, 1);

      return sessions;
    });

    await sessionsDB.removeSession(target);
  }

  async function put(target: Session) {
    if (!target.windows.length || !target.tabsNumber) {
      await remove(target);
      return;
    }

    await sessionsDB.updateSession(target);
    update((sessions) => {
      sessions[sessions.indexOf(target)] = target;
      return sessions;
    });
  }

  function filter(query: string) {
    let filtered: Session[];

    const unsubscribe = subscribe((sessions) => {
      filtered = sessions?.filter?.((session) =>
        session?.title?.toLowerCase().includes(query)
      );
    });

    unsubscribe();

    return filtered;
  }

  return {
    subscribe,
    load,
    put,
    add,
    remove,
    filter,
  };
})();

export const currentSession = (() => {
  const { subscribe, set }: Writable<Session> = writable();

  return {
    subscribe,
    async load() {
      set(await getSession());
    },
  };
})();
