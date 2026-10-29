export const palette = {
  red: '#d92323',
  'red-hover': '#732424',
  ink: '#0d0d0d',
  surface: 'color-mix(in srgb, #0d0d0d 92%, #ffffff)',
  'surface-hover': '#732424',
  'surface-deep': '#0d0d0d',
  paper: '#ffffff',
  background: '#0d0d0d',
  text: '#ffffff',
  muted: '#7b7b7b',
  line: '#7b7b7b',
  'line-soft': 'rgb(255 255 255 / 25%)',
  error: '#ffffff',
  overlay: 'rgb(13 13 13 / 80%)',
} as const;

export type Palette = typeof palette;

export const lightPalette: Record<keyof Palette, string> = {
  ...palette,
  background: '#ffffff',
  text: '#0d0d0d',
  surface: '#ffffff',
  'surface-hover': 'color-mix(in srgb, #ffffff 94%, #732424)',
  'surface-deep': 'color-mix(in srgb, #ffffff 90%, #7b7b7b)',
  muted: '#732424',
  line: '#7b7b7b',
  'line-soft': 'rgb(123 123 123 / 30%)',
  error: '#732424',
  overlay: 'rgb(13 13 13 / 65%)',
};
