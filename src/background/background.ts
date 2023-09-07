import browser from 'webextension-polyfill';
import { createTab, openInNewWindow, openSession } from './utils/browser';
import { getSession } from '@/lib/utils/getSession';
import { sessionsDB } from '@/lib/utils/database';
import { generateSession } from '@/lib/utils/generateSession';
import { getStorage } from '@/lib/utils/storage';

async function createTimer() {
	const [settings, alarm] = await Promise.all([
		getStorage(null),
		browser.alarms.get('auto-save')
	]);

	if (settings.autoSave && typeof alarm === 'undefined')
		browser.alarms.create('auto-save', {
			periodInMinutes: settings.autoSaveTimer
		});
}

createTimer();

browser.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === 'auto-save') {
		const session = await getSession();
		session.title = 'Autosave';

		sessionsDB.saveSession(generateSession(session));
	}
});

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
