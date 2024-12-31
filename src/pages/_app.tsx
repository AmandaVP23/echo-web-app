import { AppProps } from 'next/app';
import '../assets/main.css';
import '../assets/loader.css';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}