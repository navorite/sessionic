export function generateSession(session: ESession): ESession {
  const date = Date.now();

  return {
    title: session.title,
    windows: structuredClone(session.windows),
    tabsNumber: session.tabsNumber,
    dateSaved: date,
    dateModified: date,
    id: crypto.randomUUID(),
  };
}
