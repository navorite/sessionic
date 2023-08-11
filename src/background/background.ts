import browser from 'webextension-polyfill';
import { createTab, openInNewWindow, openSession } from './utils/browser';

browser.runtime.onMessage.addListener((request) => {
	switch (request.message) {
		case 'openInNewWindow': {
			openInNewWindow(request.window, request.discarded);
			break;
		}

		case 'createTab': {
			createTab(request.tab, undefined, request.discarded);
			break;
		}

		case 'openSession': {
			openSession(request.session, true, request.discarded);
			break;
		}
	}
});
