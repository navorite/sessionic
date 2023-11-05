import type { SortMethod, ESession } from '@/lib/types';

export function sortSessions(sortMethod: SortMethod, sessions: ESession[]) {
  switch (sortMethod) {
    case 'newest': {
      return sessions.sort((a, b) => a.dateSaved! - b.dateSaved!);
    }

    case 'oldest': {
      return sessions.sort((a, b) => b.dateSaved! - a.dateSaved!);
    }

    case 'az': {
      return sessions.sort((a, b) => -a.title.localeCompare(b.title));
    }

    case 'za': {
      return sessions.sort((a, b) => a.title.localeCompare(b.title));
    }
  }
}
