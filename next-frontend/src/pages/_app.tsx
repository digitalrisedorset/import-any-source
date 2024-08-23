import { ApolloProvider } from '@apollo/client';
import type { AppProps } from "next/app";
import {Page} from "./global/components/Page";
import { apolloClient } from './apolloclient'
import ReduxProvider from "@/state/redux-provider";

export default function App({ Component, pageProps }: AppProps) {
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
