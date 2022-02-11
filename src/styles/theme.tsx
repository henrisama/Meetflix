import { DefaultTheme } from 'styled-components';

declare module 'styled-components'{
  export interface DefaultTheme{
    backgroundColor: string,
    text: string
  }
}

export const light: DefaultTheme = {
	backgroundColor: '#EEE',
	text: '#222'
};

export const dark: DefaultTheme = {
	backgroundColor: '#0c0c0c',
	text: '#EEE'
};