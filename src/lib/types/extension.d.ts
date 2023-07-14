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
    | 'tab'
    | 'incognito'
    | 'expand'
    | 'collapse'
    | 'options'
    | 'save'
    | 'delete'
    | 'search'
    | 'open'
    | 'close'
    | 'redo'
    | 'undo'
    | 'rename'
    | 'more'
    | 'dark'
    | 'light'
    | 'copy'
    | 'check';

  interface ENotification {
    type: 'info' | 'success' | 'warning' | 'error';
    msg: string;
    duration?: number;
  }
}
