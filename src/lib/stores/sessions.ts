import { writable, type Writable } from 'svelte/store';
import { sessionsDB } from '@utils/database';
import { generateSession } from '@utils/generateSession';
import storage from '@utils/storage';

export default (() => {
  const { subscribe, set, update }: Writable<ESession[]> = writable();
  const selection: Writable<ESession> = writable();

  load();

  async function load(count?: number) {
    set(await sessionsDB.loadSessions(count));

    let selection = (await storage?.get('selection'))?.selection;

    if (!selection) return;

    const unsubscribe = subscribe((sessions) => {
      for (const session of sessions) {
        if (session.id === selection) {
          select(session);
          break;
        }
      }
    });

    unsubscribe();
  }

  async function add(session: ESession) {
    if (!session.windows.length) return;

    const generated = generateSession(session);

    await sessionsDB.saveSession(generated);

    update((sessions) => {
      sessions.push(generated);
      return sessions;
    });

    select(generated);

    return generated;
  }

  async function put(target: ESession) {
    if (!target.windows.length || !target.tabsNumber)
      return await remove(target);

    await sessionsDB.updateSession(target);

    update((sessions) => {
      target.dateModified = Date.now();

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

    return filtered; //subject to change
  }

  async function remove(target: ESession) {
    await sessionsDB.deleteSession(target);

    update((sessions) => {
      const index = sessions.indexOf(target);

      if (index > -1) sessions.splice(index, 1);

      return sessions;
    });
  }

  async function removeAll() {
    await sessionsDB.deleteSessions();
    set([]);
  }

  async function select(session: ESession) {
    selection.set(session);

    storage?.set({ selection: session.id });
  }

  return {
    subscribe,
    load,
    add,
    put,
    filter,
    remove,
    removeAll,
    selection: { subscribe: selection.subscribe, select, set: selection.set }, //TODO: remove the ability to set
  };
})();
