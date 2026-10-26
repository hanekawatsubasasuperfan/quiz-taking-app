import { createGlobalStyle } from 'styled-components';
import { palette } from './palette';

export const GlobalPalette = createGlobalStyle`
  :root {
    ${Object.entries(palette).map(([name, color]) => `--${name}: ${color};`).join('\n')}
  }
`;
