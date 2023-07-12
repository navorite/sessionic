export const MESSAGES = {
  load: {
    success: 'Sessions loaded successfuly!',
    info: "Let's save some sessions!",
    fail: { generic: 'Error loading sessions' },
  },

  save: {
    success: 'Session saved successfuly!',
    fail: {
      generic: 'Error saving session',
      session_empty: 'Error saving session: session is empty',
    },
  },

  update: {
    success_info: 'Session updated successfuly!',
    fail: {
      generic: 'Error updating session',
    },
  },

  remove: {
    success_warning: 'Session was removed!',
    fail: {
      generic: 'Error deleting session',
      is_undefined: 'Error deleting session: session undefined',
      current_session: 'Error: Deleting current session is not allowed',
    },
  },

  removeAll: {
    success_warning: 'All sesssions removed successfuly.',
    fail: {
      generic: 'Error deleting all sessions',
      empty: 'Error deleting all sessions: no sessions found',
    },
  },
} satisfies Record<string, Record<string, string | Record<string, string>>>;
