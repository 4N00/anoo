import 'styled-components';
import { Theme } from './theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export type DefaultTheme = Theme;
} 