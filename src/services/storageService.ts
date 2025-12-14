export const storageService = {
  saveUsername: (username: string) => {
    localStorage.setItem('chatroom_username', username);
  },

  getUsername: (): string | null => {
    return localStorage.getItem('chatroom_username');
  },

  clearUsername: () => {
    localStorage.removeItem('chatroom_username');
  },

  saveUserPreferences: (prefs: Record<string, any>) => {
    localStorage.setItem('chatroom_prefs', JSON.stringify(prefs));
  },

  getUserPreferences: () => {
    const prefs = localStorage.getItem('chatroom_prefs');
    return prefs ? JSON.parse(prefs) : {};
  },
};
