import type { Icon } from '@/lib/types';

export const isPopup = !new URL(document.location.href).searchParams.has('tab');

export const tabType: Record<string, Icon> = {
	'://settings': 'settings',
	'://history': 'history',
	'extension://': 'extension',
	'://extensions': 'extension',
	'://newtab': 'chrometab'
};
