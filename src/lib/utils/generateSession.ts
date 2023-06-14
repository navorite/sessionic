export async function generateSession(session: ESession) {
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
