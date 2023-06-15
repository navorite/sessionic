import type { UUID } from 'crypto';

declare global {
  interface ESession {
    title: string;
    windows: EWindow[];
    tabsNumber: number;
    dateSaved: number;
    dateModified: number;
    id: UUID | 'current';
  }

  interface FilterOptions {
    query?: string;
    default_tabs?: boolean;
  }

  type Page = 'popup' | 'options';

  type Icon =
    | 'default'
    | 'session'
    | 'window'
    | 'window_off'
    | 'incognito'
    | 'incognito_off'
    | 'options'
    | 'save'
    | 'delete'
    | 'search'
    | 'clear'
    | 'open'
    | 'redo'
    | 'undo'
    | 'rename'
    | 'dark'
    | 'light';

  interface ENotification {
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    duration?: number;
  }
}
