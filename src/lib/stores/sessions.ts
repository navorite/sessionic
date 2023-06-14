import { writable, type Writable } from 'svelte/store';

import { sessionsDB } from '@utils/database';

export default (() => {
  const { subscribe, set, update }: Writable<ESession[]> = writable();

  async function load(count?: number) {
    set(await sessionsDB.loadSessions(count));
  }

  async function add(session: ESession) {
    if (!session.windows.length) return;

    await sessionsDB.saveSession(session);

    update((sessions) => {
      sessions.push(session);
      return sessions;
    });
  }

  async function remove(target: ESession) {
    update((sessions) => {
      const index = sessions.indexOf(target);

      if (index > -1) sessions.splice(index, 1);

      return sessions;
    });

    await sessionsDB.removeSession(target);
  }

  async function put(target: ESession) {
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
    let filtered: ESession[];

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
