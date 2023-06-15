import { writable, type Writable } from 'svelte/store';

import { sessionsDB } from '@utils/database';
import { generateSession } from '@utils/generateSession';

export default (() => {
  const { subscribe, set, update }: Writable<ESession[]> = writable();

  async function load(count?: number) {
    set(await sessionsDB.loadSessions(count));
  }

  async function add(session: ESession) {
    if (!session.windows.length) return;

    const generated = generateSession(session);

    await sessionsDB.saveSession(generated);

    update((sessions) => {
      sessions.push(generated);
      return sessions;
    });

    return generated;
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

  async function remove(target: ESession) {
    update((sessions) => {
      const index = sessions.indexOf(target);

      if (index > -1) sessions.splice(index, 1);

      return sessions;
    });

    await sessionsDB.deleteSession(target);
  }

  function removeAll() {
    set([]);
    return sessionsDB.deleteSessions();
  }

  return {
    subscribe,
    load,
    add,
    put,
    filter,
    remove,
    removeAll,
  };
})();
