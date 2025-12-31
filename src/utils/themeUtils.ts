export type Theme = 'light' | 'dark';

export const THEME_COLORS = {
  light: {
    background: '#ffffff',
    text: '#000000',
    primary: '#007bff',
    secondary: '#6c757d',
    accent: '#ff6b6b',
  },
  dark: {
    background: '#1e1e1e',
    text: '#ffffff',
    primary: '#0d6efd',
    secondary: '#adb5bd',
    accent: '#ff7675',
  },
};

export function getTheme(theme: Theme) {
  return THEME_COLORS[theme];
}

export function setTheme(theme: Theme) {
  localStorage.setItem('chatroom_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

export function getStoredTheme(): Theme {
  const stored = localStorage.getItem('chatroom_theme');
  return (stored as Theme) || 'light';
}
