import type { UUID } from 'crypto';
import type { ETab, EWindow } from '@/lib/types';

//Tab Session Manager sessions
export interface ETSM {
  name: string;
  windows: ETSMWindow;
  windowsNumber: number;
  windowsInfo: ETSMWindowInfo;
  tabsNumber: number;
  date: number;
  lastEditedTime: number;
  sessionStartTime: number;
  tag: string[];
  id: UUID;
}

interface ETSMWindow {
  [windowId: string]: {
    [tabId: string]: ETab & { groupId: number; selected: boolean };
  };
}

interface ETSMWindowInfo {
  [windowId: string]: EWindow;
}

//Session Buddy session
export interface ESB {
  type: 'saved' | 'current';
  name: string;
  generated: string;
  created: string;
  modified: string;
  id: number;
  gid: string;
  windows: EWindow[];
}

//Session Buddy sessions
export interface ESBImport {
  sessions: ESB[];
}
