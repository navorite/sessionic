export const MESSAGES = {
  load: {
    success: 'Sessions loaded successfuly!',
    fail: { generic: 'Error loading sessions' },
  },

  save: {
    success: 'Session saved successfuly!',
    fail: {
      generic: 'Error saving session',
      session_empty: 'Error saving session: session is empty',
    },
  },

  rename: {
    success_info: 'Session renamed successfuly!',
    fail: { generic: 'Error renaming session' },
  },

  remove: {
    success_warning: 'Session removed successfuly!',
    fail: {
      generic: 'Error deleting session',
    },
  },

  removeAll: {
    success_warning: 'All sesssions removed successfuly.',
    fail: {
      generic: 'Error deleting all sessions',
    },
  },
} satisfies Record<string, Record<string, string | Record<string, string>>>;
