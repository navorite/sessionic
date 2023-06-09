import type { Session } from '../types/extension';

export async function generateSession(session: Session) {
  const date = new Date().getTime();

  return {
    ...session,
    dateSaved: date,
    dateModified: date,
    id: crypto.randomUUID(),
  };
}
