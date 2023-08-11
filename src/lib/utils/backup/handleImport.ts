import type { ESession } from '@/lib/types';
import { decompressFromUint8Array } from 'lz-string';
import { convertSessions, sessionsDB } from '@/lib/utils';

export async function handleImport(event: Event) {
	const file = (event.target as HTMLInputElement).files![0]!;

	const fileReader = new FileReader();

	const isSSF = file.name.endsWith('ssf');

	isSSF ? fileReader.readAsArrayBuffer(file) : fileReader.readAsText(file);

	fileReader.onloadend = async (ev) => {
		let sessions: ESession[] | undefined = [];

		let result = ev.target?.result;

		if (isSSF) {
			const bytes = new Uint8Array(result as ArrayBufferLike);

			sessions = JSON.parse(decompressFromUint8Array(bytes)) as ESession[];
		} else {
			if ((result as string).charCodeAt(0) === 0xfeff)
				result = result?.slice(1);

			sessions = await convertSessions(JSON.parse(result as string));
		}

		if (!sessions?.length) return;

		sessionsDB.saveSessions(sessions);
	};
}
