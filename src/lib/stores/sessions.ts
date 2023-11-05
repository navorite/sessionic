import type { UUID } from 'crypto';
import type { ESession, EWindow } from '@/lib/types';
import { derived, get, writable, type Writable } from 'svelte/store';
import { sessionsDB } from '@utils/database';
import { settings, notification, filterOptions } from '@/lib/stores';
import { MESSAGES } from '@constants/notifications';
import { log, generateSession, sendMessage } from '@/lib/utils';
import browser from 'webextension-polyfill';

export const sessions = (() => {
  const { subscribe, set, update }: Writable<ESession[]> = writable([]);
  const selection: Writable<ESession> = writable();

  load();

  async function load() {
    const count = await sessionsDB.streamSessions('dateSaved', set, 50);

    log.info(`[sessions.load] loaded ${count} session`);

    await settings.init(); // to fix inconsistent behaviour with FF and Chrome - need to check

    const { selectionId } = get(settings);

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
      generated.windows = { length: generated.windows.length } as EWindow[]; //unref the obj for GC

      sessions.push(generated);

      notify(sessions, generated.id);

      return sessions;
    });

    select(generated);

    notification.success(MESSAGES.save.success);
  }

  async function put(target: ESession) {
    if (!target.windows.length || !target.tabsNumber) return remove(target);

    if (!Array.isArray(target.windows))
      target.windows = (await sessionsDB.loadSessionWindows(
        target.id as UUID
      ))!;

    await sessionsDB.updateSession(target);

    update((sessions) => {
      target.dateModified = Date.now();

      target.windows = { length: target.windows.length } as EWindow[]; //unref the obj for GC

      sessions[sessions.indexOf(target)] = target;

      notify(sessions, target.id);

      return sessions;
    });

    selectById(target.id);

    notification.success_info(MESSAGES.update.success_info);
  }

  let timeout: NodeJS.Timeout;

  async function filter(query: string) {
    if (timeout) clearTimeout(timeout);

    const result = await new Promise<ESession[]>((resolve, reject) => {
      timeout = setTimeout(async () => {
        if (!query) reject('There is no search query');

        const sessions = await sessionsDB.loadSessions();

        if (!sessions.length) reject('There are no saved sessions');

        const filtered: ESession[] = [];

        for (const session of sessions) {
          if (session?.title?.toLowerCase().includes(query)) {
            filtered.push(session);
            continue;
          }

          if (
            session.windows.some(
              (window) =>
                window.tabs?.some(
                  (tab) => tab.title?.toLowerCase().includes(query)
                )
            )
          ) {
            session.windows = { length: session.windows.length } as EWindow[];
            filtered.push(session);
          }
        }
        resolve(filtered); //subject to change;
      }, 250);
    });

    return result;
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

      notify(sessions);

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

    notify([]);
  }

  async function select(session: ESession) {
    settings.changeSetting('selectionId', session.id);
  }

  // Without a call to changeSetting - this is used in certain area where we do not need to save storage.
  async function selectById(selectionId: 'current' | UUID) {
    clearSelection();

    if (selectionId === 'current') return selection.set(get(currentSession));

    const windowsPromise = sessionsDB.loadSessionWindows(selectionId as UUID);

    const sessions = get({ subscribe });

    for (const session of sessions) {
      if (session.id === selectionId) {
        //TODO: remove the ability to set
        session.windows = (await windowsPromise) as EWindow[];

        selection.set(session);
        return;
      }
    }

    return select(get(currentSession));
  }

  function clearSelection() {
    selection.update((value) => {
      if (value?.id !== 'current' && value?.windows?.length)
        value.windows = { length: value.windows.length } as EWindow[];

      return value;
    });
  }

  function notify(sessions: ESession[], selectedId?: UUID | 'current') {
    log.info('[db.notify]: init');
    sendMessage({ message: 'notifyChangeDB', sessions, selectedId });
  }

  browser.runtime.onMessage.addListener((request) => {
    if (request.message === 'notifyChangeDB') {
      set(request.sessions);

      if (!request.selectedId) return;

      selectById(request.selectedId);
    }
  });

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
      set: selection.set
    } //TODO: remove the ability to set
  };
})();

export const filtered = derived(
  [sessions, filterOptions],
  ([$sessions, $filterOptions]) =>
    $filterOptions.query
      ? sessions?.filter($filterOptions?.query?.trim().toLowerCase())
      : $sessions
);

export const currentSession: Writable<ESession> = writable();
