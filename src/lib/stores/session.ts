import { writable, type Writable } from 'svelte/store';
import type { Session } from '../types/extension';

export const sessionList: Writable<Session[]> = writable([]);
export const currentSession: Writable<Session> = writable();

/*$: windowsNumber = session?.windowsObj.length;
$: tabsNumber = (() => {
  session?.windowsObj;
})();*/
