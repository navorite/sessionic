import type { ENotification } from '@/lib/types';
import { writable, type Writable } from 'svelte/store';
import { log } from '@/lib/utils';

export const notification = (() => {
  const { subscribe, set }: Writable<ENotification> = writable();

  function info(msg: string, debugMsg?: string) {
    set({ type: 'info', msg });
    debugMsg && log.info(debugMsg);
  }

  function success(msg: string, debugMsg?: string) {
    set({ type: 'success', msg });
    debugMsg && log.info(debugMsg);
  }

  function warning(msg: string, debugMsg?: string) {
    set({ type: 'warning', msg });
    debugMsg && log.warn(debugMsg);
  }

  function error(msg: string, debugMsg?: string) {
    set({ type: 'error', msg });
    debugMsg && log.error(debugMsg);
  }

  // For actions that succeded but are dangerous and require care such as deleteing
  function success_warning(msg: string, debugMsg?: string) {
    set({ type: 'warning', msg });
    debugMsg && log.info(debugMsg);
  }

  // For actions that succeded but not necessarily requiring attention
  function success_info(msg: string, debugMsg?: string) {
    set({ type: 'info', msg });
    debugMsg && log.info(debugMsg);
  }

  return {
    subscribe,
    set,
    info,
    success,
    warning,
    error,
    success_info,
    success_warning
  };
})();
