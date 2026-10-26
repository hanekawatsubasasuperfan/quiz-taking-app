export const palette = {
  red: '#ed0011',
  'red-hover': '#c6000e',
  ink: '#080808',
  surface: '#161616',
  'surface-hover': '#242424',
  'surface-deep': '#000000',
  paper: '#ffffff',
  muted: '#b8b8b8',
  line: '#383838',
  'line-soft': 'rgb(255 255 255 / 25%)',
  error: '#ff858e',
  overlay: 'rgb(0 0 0 / 80%)',
} as const;

export type Palette = typeof palette;
