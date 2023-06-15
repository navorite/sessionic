import { writable, type Writable } from 'svelte/store';

export const filterOptions: Writable<FilterOptions> = writable({ query: '' });
