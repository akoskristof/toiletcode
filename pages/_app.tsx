import {SessionProvider} from 'next-auth/react';
import type {AppProps} from 'next/app'
import '@/styles/globals.css'

export default function App({Component, pageProps}) {
    //const loggedIn = localStorage.getItem('loggedIn');
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}