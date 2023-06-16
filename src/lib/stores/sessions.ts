import { writable, type Writable } from 'svelte/store';
import { sessionsDB } from '@utils/database';
import { generateSession } from '@utils/generateSession';
import storage from '@utils/storage';
import { notification } from './notification';
import { MESSAGES } from '@constants/notifications';
import log from '@utils/log';

export default (() => {
  const { subscribe, set, update }: Writable<ESession[]> = writable();
  const selection: Writable<ESession> = writable();

  load();

  async function load(count?: number) {
    const selectionID = (await storage?.get('selectionID'))?.selectionID;

    set(await sessionsDB.loadSessions(count));

    notification.success(MESSAGES.load.success);

    if (!selectionID || selectionID === 'current') return;

    const unsubscribe = subscribe((sessions) => {
      for (const session of sessions) {
        if (session.id === selectionID) {
          select(session);
          break;
        }
      }
    });

    unsubscribe();
  }

  async function add(session: ESession) {
    if (!session.windows.length || !session.tabsNumber) {
      log.error('[sessions.add]: session is empty');

      notification.error(MESSAGES.save.fail.session_empty);
      return;
    }

    const generated = generateSession(session);

    await sessionsDB.saveSession(generated);

    update((sessions) => {
      sessions.push(generated);
      return sessions;
    });

    notification.success(MESSAGES.save.success);

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

    notification.success_info(MESSAGES.rename.success_info);
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

      if (index !== -1) sessions.splice(index, 1);

      return sessions;
    });

    notification.success_warning(MESSAGES.remove.success_warning);
  }

  async function removeAll() {
    await sessionsDB.deleteSessions();
    set([]);
    notification.success_warning(MESSAGES.removeAll.success_warning);
  }

  async function select(session: ESession) {
    selection.set(session);

    storage?.set({ selectionID: session.id });
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
