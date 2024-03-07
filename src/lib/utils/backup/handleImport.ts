import type { ESession } from '@/lib/types';
import { decompressFromUint8Array } from 'lz-string';
import { convertOTSessions, convertSessions, sessionsDB } from '@/lib/utils';

export async function handleImport(event: Event) {
  const file = (event.target as HTMLInputElement).files![0]!;

  const fileReader = new FileReader();

  const ext = file.name.match(/.ssf(.json)?/)?.[0];

  ext ? fileReader.readAsArrayBuffer(file) : fileReader.readAsText(file);

  fileReader.onloadend = async (ev) => {
    let sessions: ESession[] | undefined = [];

    let result = ev.target?.result;

     if (ext) {
      const data = new Uint8Array(result as ArrayBufferLike);

      sessions = JSON.parse(decompressFromUint8Array(bytes)) as ESession[];
      
      if (data) {
        sessions = JSON.parse(
          ext === '.ssf'
            ? decompressFromUint8Array(data)
            : new TextDecoder().decode(data)
        ) as ESession[];
      }
    } else {
      if ((result as string).charCodeAt(0) === 0xfeff)
        result = result?.slice(1);

      try {
        sessions = await convertSessions(JSON.parse(result as string));
      } catch (e) {
        const session = convertOTSessions(result as string);

        if (!session) return;

        sessions = [session];
      }
    }

    if (!sessions?.length) return;

    sessionsDB.saveSessions(sessions);
  };
}
