import type { SortMethod, ESession } from '@/lib/types';

export function sortSessions(sortMethod: SortMethod, sessions: ESession[]) {
  switch (sortMethod) {
    case 'newest': {
      return sessions.sort((a, b) => {
        if (a.dateModified! > b.dateModified!) return 1;

        if (a.dateModified! < b.dateModified!) return -1;

        return 0;
      });
    }

    case 'oldest': {
      return sessions.sort((a, b) => {
        if (a.dateModified! > b.dateModified!) return -1;

        if (a.dateModified! < b.dateModified!) return 1;

        return 0;
      });
    }

    case 'az': {
      return sessions.sort((a, b) => -a.title.localeCompare(b.title));
    }

    case 'za': {
      return sessions.sort((a, b) => a.title.localeCompare(b.title));
    }
  }
}
