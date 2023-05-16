import { writable } from 'svelte/store';

export const dark = writable(
  window.matchMedia('(prefers-color-scheme: dark)').matches
);
