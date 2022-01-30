import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { dark, light } from '@/src/styles/theme';
import GlobalStyle from '@/src/styles/global';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ThemeProvider theme={
				/* window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: light)').matches
					? light
					: dark */
				dark
			}>
				<Head>
					<title>Meetflix</title>
				</Head>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default App;
