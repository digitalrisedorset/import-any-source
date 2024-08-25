import { ApolloProvider } from '@apollo/client';
import type { AppProps } from "next/app";
import {Page} from "./global/components/Page";
import { apolloClient } from './apolloclient'
import ReduxProvider from "@/state/redux-provider";
import Axios from "axios"
import { config } from '@/config';

export default function App({ Component, pageProps }: AppProps) {
    Axios.defaults.baseURL = config.nodejsEndpoint;

    return (
        <ApolloProvider client={apolloClient}>
            <ReduxProvider>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </ReduxProvider>
        </ApolloProvider>
    )
}
