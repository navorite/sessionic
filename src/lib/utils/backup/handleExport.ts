import { EXT_NAME } from '@/lib/constants';
import { sessionsDB } from '@/lib/utils';
import { compressToUint8Array } from 'lz-string';

export async function handleExport() {
  const date = new Date();

  const sessions = await sessionsDB.loadSessions();

  if (!sessions.length) return;

  const fileName = `[${EXT_NAME}:${sessions.length}]${date.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short'
  })}.ssf`;

  const compressed = compressToUint8Array(JSON.stringify(sessions));

  const blob = new Blob([compressed]);

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a') as HTMLAnchorElement;

  anchor.style.display = 'none';

  anchor.href = url;
  anchor.download = fileName;

  document.body.appendChild(anchor);

  anchor.click();

  URL.revokeObjectURL(url);

  anchor.remove();
}
