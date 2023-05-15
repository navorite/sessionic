import type { Window } from './browser';

export interface Session {
  title: string;
  windowsObj: Window[];
  windowsNumber: number;
  tabsNumber: number;
  dateOfSave: Date;
  id: string;
}

export type Page = 'popup' | 'options';

export type Icon =
  | 'default'
  | 'session'
  | 'windowon'
  | 'windowoff'
  | 'options'
  | 'save'
  | 'delete'
  | 'search'
  | 'clear'
  | 'open'
  | 'redo'
  | 'undo'
  | 'dark'
  | 'light';
