import type { Session } from '../types/extension';

export async function generateSession(session: Session) {
  const date = Date.now();

  return {
    title: session.title,
    windows: session.windows.slice(0),
    tabsNumber: session.tabsNumber,
    dateSaved: date,
    dateModified: date,
    id: crypto.randomUUID(),
  };
}
