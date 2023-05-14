import type { Window } from './browser';

export interface Session {
  title: string;
  windowsObj: Window[];
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
  | 'undo';
