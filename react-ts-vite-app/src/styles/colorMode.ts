import { lightPalette, palette } from './palette';

export type ColorMode = 'light' | 'dark';
const storageKey = 'quiz-color-mode';

export function getInitialColorMode(): ColorMode {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // The toggle also works when browser storage is unavailable.
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function applyColorMode(mode: ColorMode, save = false) {
  document.documentElement.dataset.theme = mode;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',
    mode === 'light' ? lightPalette.background : palette.background);
  if (save) {
    try {
      localStorage.setItem(storageKey, mode);
    } catch {
      // Keep the current session usable even if persistence is blocked.
    }
  }
}
