import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ToastProvider } from '../context/toasts';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Head>
        <title>Emoji Search</title>
      </Head>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
