import { writable, type Writable } from 'svelte/store';

export const notification: Writable<ENotification> = writable();
