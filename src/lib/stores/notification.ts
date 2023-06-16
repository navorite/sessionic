import { writable, type Writable } from 'svelte/store';

export const notification = (() => {
  const { subscribe, set }: Writable<ENotification> = writable();

  function info(msg: string) {
    set({ type: 'info', msg });
  }

  function success(msg: string) {
    set({ type: 'success', msg });
  }

  function warning(msg: string) {
    set({ type: 'warning', msg });
  }

  function error(msg: string) {
    set({ type: 'error', msg });
  }

  // For actions that succeded but are dangerous and require care such as deleteing
  function success_warning(msg: string) {
    warning(msg);
  }

  // For actions that succeded but not necessarily requiring attention
  function success_info(msg: string) {
    info(msg);
  }

  return {
    subscribe,
    info,
    success,
    warning,
    error,
    success_info,
    success_warning,
  };
})();
