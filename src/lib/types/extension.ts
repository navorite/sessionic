import type { UUID } from 'crypto';
import type { Window } from './browser';

export interface Session {
  title: string;
  windows: Window[];
  windowsNumber: number;
  tabsNumber: number;
  dateSaved: number;
  dateModified: number;
  id: UUID;
}

export interface Sessions {
  unfilteredSessions: Session[];
  filteredSessions?: Session[];
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
