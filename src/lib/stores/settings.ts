import { writable, type Writable } from 'svelte/store';
import type { FilterOptions } from '../types/extension';

export const isTabPopup = writable(false);
export const filterOptions: Writable<FilterOptions> = writable({ query: '' });
