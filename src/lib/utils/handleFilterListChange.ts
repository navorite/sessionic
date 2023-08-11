import { settings } from '../stores';

export function handleFilterListChange(
	ev: Event & { currentTarget: EventTarget & HTMLTextAreaElement },
	urlList: string
) {
	const value = ev.currentTarget.value;

	const urls = value.match(
		/(\b(https?|ftp|file)|\B\*):\/{2}(\*|(\*\.)?[^*/\s:]*)\/[^\s]*/g
	) ?? ['<all_urls>'];

	settings.changeSetting('urlFilterList', urls);

	ev.currentTarget.value = urlList;
}
