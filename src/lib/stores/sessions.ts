import { get, writable, type Writable } from 'svelte/store';
import { sessionsDB } from '@utils/database';
import { generateSession } from '@utils/generateSession';
import storage from '@utils/storage';
import { notification } from './notification';
import { MESSAGES } from '@constants/notifications';
import log from '@utils/log';
import { currentSession } from '@components/Sessions/Current.svelte';

export default (() => {
  const { subscribe, set, update }: Writable<ESession[]> = writable();
  const selection: Writable<ESession> = writable();

  load();

  async function load(count?: number) {
    const selectionID = (await storage?.get('selectionID'))?.selectionID;

    const sessions = await sessionsDB.loadSessions(count);

    set(sessions);

    if (sessions.length)
      notification.success(
        MESSAGES.load.success,
        `[sessions.load] loaded ${sessions.length} sessions`
      );

    if (!sessions.length) notification.info(MESSAGES.load.info);

    if (!selectionID || selectionID === 'current') return;

    for (const session of sessions) {
      if (session.id === selectionID) {
        select(session);
        break;
      }
    }
  }

  async function add(session: ESession) {
    if (!session.windows.length || !session.tabsNumber)
      return notification.error(
        MESSAGES.save.fail.session_empty,
        '[sessions.add]: session is empty'
      );

    const generated = generateSession(session);

    await sessionsDB.saveSession(generated);

    update((sessions) => {
      sessions.push(generated);
      return sessions;
    });

    notification.success(MESSAGES.save.success);

    select(generated);
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
    if (!target)
      return notification.error(
        MESSAGES.remove.fail.is_undefined,
        '[sessions.remove] error: removing undefined session'
      );

    if (target.id === 'current')
      return notification.error(
        MESSAGES.remove.fail.current_session,
        '[sessions.remove] error: removing current session'
      );

    update((sessions) => {
      const index = sessions.indexOf(target);

      if (index !== -1) sessions.splice(index, 1);

      return sessions;
    });

    await sessionsDB.deleteSession(target);

    notification.success_warning(MESSAGES.remove.success_warning);
  }

  async function removeAll() {
    let length = 0;

    const unsubscribe = subscribe((sessions) => {
      length = sessions.length;
    });

    unsubscribe();

    if (!length) {
      notification.error(
        MESSAGES.removeAll.fail.empty,
        '[sessions.removeAll] sessions are already empty'
      );
      return;
    }

    await sessionsDB.deleteSessions();

    set([]); //Empty the array, no longer needed

    select(get(currentSession));

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
