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

	type URLFilterList = string[] | ['<all_urls>'];

	type Icon =
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

	interface ENotification {
		type: 'info' | 'success' | 'warning' | 'error';
		msg: string;
		duration?: number;
	}

	interface ESettings {
		darkMode: boolean;
		popupView: boolean;
		selectionId: 'current' | UUID;
		discarded: boolean;
		urlFilterList: URLFilterList;
	}
}
