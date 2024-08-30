import { ApolloProvider } from '@apollo/client';
import '@/pages/global/styles/nprogress.css';
import Router from 'next/router';
import type { AppProps } from "next/app";
import {Page} from "./global/components/Page";
import { apolloClient } from './apolloclient'
import Axios from "axios"
import { config } from '@/config';
import NProgress from 'nprogress';
import StateProvider from "@/state/StateProvider";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
    Axios.defaults.baseURL = config.nodejsEndpoint;

    return (
        <ApolloProvider client={apolloClient}>
            <StateProvider>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </StateProvider>
        </ApolloProvider>
    )
}
