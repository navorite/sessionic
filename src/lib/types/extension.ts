import type { Window } from './browser';

// export interface Session {
//   title: string;
//   windowsObj: Window[];
//   windowsNumber: number;
//   tabsNumber: number;
//   dateSaved: Date;
//   dateModified: Date;
//   id: string;
// }

export interface Session {
  title: string;
  windowsObj: Window[];
  tabsNumber: number;
  dateOfSave: Date;
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
