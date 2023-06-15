export const notifications: {
  [key: string]: { [key: string]: ENotification };
} = {
  save: {
    success: { type: 'success', message: 'Session saved successfuly!' },
    fail: { type: 'error', message: 'Error saving session' },
  },
  rename: {
    success: { type: 'info', message: 'Session renamed successfuly!' },
    fail: { type: 'error', message: 'Error renaming session' },
  },
  remove: {
    success: { type: 'warning', message: 'Session removed successfuly!' },
    fail: { type: 'error', message: 'Error removing seesion' },
  },

  removeAll: {},
};
