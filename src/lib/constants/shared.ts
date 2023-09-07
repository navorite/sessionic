import browser from 'webextension-polyfill';
import type { compressOptions } from '@/lib/types';

export const EXT_NAME = __EXT_NAME__;
export const EXT_VER = __EXT_VER__;
export const EXT_MODE = __EXT_MODE__;

export const isDEV = process.env.NODE_ENV !== 'production';

export const isFirefox = !!browser.runtime?.getBrowserInfo;

export const runtimeURL = browser.runtime.getURL('');

export const tabAttr = [
	'id',
	'title',
	'url',
	'favIconUrl',
	'active',
	'discarded',
	'pinned',
	'incognito',
	'mutedInfo',
	...(isFirefox ? ['isInReaderMode', 'cookieStoreId'] : ['groupId'])
];

export const compress_options: compressOptions = {
	type: 'image/webp',
	quality: 0.7,
	max_size: 20
};
