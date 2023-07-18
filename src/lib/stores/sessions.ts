import { get, writable, type Writable } from 'svelte/store';
import { sessionsDB } from '@utils/database';
import { generateSession } from '@utils/generateSession';
import settings from './settings';
import { notification } from './notification';
import { MESSAGES } from '@constants/notifications';
import log from '@utils/log';
import { currentSession } from '@components/Sessions/Current.svelte';
import type { UUID } from 'crypto';

export default (() => {
  const { subscribe, set, update }: Writable<ESession[]> = writable();
  const selection: Writable<ESession> = writable();

  load();

  async function load(count?: number) {
    const sessions = await sessionsDB.loadSessions(count);

    set(sessions);

    log.info(`[sessions.load] loaded ${sessions.length} session`);

    if (!sessions.length) notification.info(MESSAGES.load.info);

    await settings.init(); // to fix inconsistent behaviour with FF and Chrome - need to check

    const selectionId = get(settings).selectionId;

    if (selectionId === 'current') return;

    selectById(selectionId);
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

    notification.success_info(MESSAGES.update.success_info);
  }

  function filter(query: string) {
    const filtered: ESession[] = get({ subscribe })?.filter((session) =>
      session?.title?.toLowerCase().includes(query)
    );

    return filtered; //subject to change
  }

  async function remove(target: ESession) {
    if (!target)
      return notification.error(
        MESSAGES.remove.fail.is_undefined,
        '[sessions.remove] error: removing undefined session'
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
    const length = get({ subscribe }).length;

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

  function select(session: ESession) {
    selection.set(session);

    settings.changeSetting('selectionId', session.id);
  }

  // Without a call to changeSetting - this is used in certain area where we do not need to save storage.
  function selectById(selectionId: 'current' | UUID) {
    if (selectionId === 'current') return selection.set(get(currentSession));

    const sessions = get({ subscribe });

    for (const session of sessions) {
      if (session.id === selectionId) {
        selection.set(session);
        break;
      }
    }
  }

  return {
    subscribe,
    load,
    add,
    put,
    filter,
    remove,
    removeAll,
    selection: {
      subscribe: selection.subscribe,
      select,
      selectById,
      set: selection.set, //TODO: remove the ability to set
    },
  };
})();
