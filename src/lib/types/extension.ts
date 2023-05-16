import type { UUID } from 'crypto';
import type { Window } from './browser';

export interface Session {
  title: string;
  windows: Window[];
  windowsNumber: number;
  tabsNumber: number;
  dateSaved: Date;
  dateModified: Date;
  id: UUID;
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