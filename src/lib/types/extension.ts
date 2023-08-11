import type { UUID } from 'crypto';
import type { ETab, EWindow } from '@/lib/types';

export interface ESession {
	title: string;
	windows: EWindow[];
	tabsNumber: number;
	dateSaved: number | undefined;
	dateModified: number | undefined;
	id: UUID | 'current';
}

export interface FilterOptions {
	query: string;
	default_tabs?: boolean;
}

export type Page = 'popup' | 'options';

export type URLFilterList = string[] | ['<all_urls>'];

export type Icon =
	| 'default'
	| 'copy'
	| 'check'
	| 'save'
	| 'rename'
	| 'delete'
	| 'open'
	| 'close'
	| 'incognito'
	| 'window'
	| 'tab'
	| 'expand'
	| 'collapse'
	| 'search'
	| 'light'
	| 'dark'
	| 'options'
	| 'donate';

export interface ENotification {
	type: 'info' | 'success' | 'warning' | 'error';
	msg: string;
	duration?: number;
}

export interface ESettings {
	darkMode: boolean;
	popupView: boolean;
	selectionId: 'current' | UUID;
	discarded: boolean;
	urlFilterList: URLFilterList;
}

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

export interface ESBImport {
	sessions: ESB[];
}
