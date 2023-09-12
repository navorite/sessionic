import browser from 'webextension-polyfill';
import { createTab, openInNewWindow, openSession } from './utils/browser';
import { getSession } from '@/lib/utils/getSession';
import { sessionsDB } from '@/lib/utils/database';
import { generateSession } from '@/lib/utils/generateSession';
import { getStorage } from '@/lib/utils/storage';
import { autoSaveDefaults } from '@/lib/constants/shared';
import type { ESettings } from '@/lib/types';
import { sendMessage } from '@/lib/utils/messages';

async function createTimer() {
	const [settings, alarm] = await Promise.all([
		getStorage(autoSaveDefaults as ESettings),
		browser.alarms.get('auto-save')
	]);

	if (
		settings.autoSave &&
		(typeof alarm === 'undefined' ||
			alarm.periodInMinutes !== settings.autoSaveTimer)
	)
		browser.alarms.create('auto-save', {
			periodInMinutes: settings.autoSaveTimer
		});
}

createTimer();

browser.alarms.onAlarm.addListener(async (alarm) => {
	if (alarm.name === 'auto-save') {
		const session = await getSession();
		session.title = 'Autosave';
		session.tags = 'Autosave';

		await sessionsDB.saveSession(generateSession(session));

		const [count, { autoSaveMaxSessions, selectionId }] = await Promise.all([
			sessionsDB.getAutosavedCount(),
			getStorage({
				autoSaveMaxSessions: autoSaveDefaults.autoSaveMaxSessions,
				selectionId: 'current'
			} as ESettings)
		]);

		if (count > autoSaveMaxSessions)
			sessionsDB.deleteLastAutosavedSession(count - autoSaveMaxSessions);

		const sessions = sessionsDB.lazyLoadSessions();

		sendMessage({
			message: 'notifyChangeDB',
			sessions: await sessions,
			selectedId: selectionId
		});
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

		case 'createTimer': {
			createTimer();
			break;
		}
	}
});
