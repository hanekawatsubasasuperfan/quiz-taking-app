import { createGlobalStyle } from 'styled-components';
import { palette, lightPalette } from './palette';

export const GlobalPalette = createGlobalStyle`
  :root {
    color-scheme: dark;
    ${Object.entries(palette).map(([name, color]) => `--${name}: ${color};`).join('\n')}
  }
  :root[data-theme='light'] {
    color-scheme: light;
    ${Object.entries(lightPalette).map(([name, color]) => `--${name}: ${color};`).join('\n')}
  }
`;
