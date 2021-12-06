import type { AppProps } from 'next/app';
import { ToastProvider } from '../context/toasts';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
