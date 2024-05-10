import { graphqlEndpoint, magentographqlEndpoint, nodejsEndpoint } from './config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { QueryClient, QueryClientProvider } from 'react-query'
import { HttpLink, ApolloLink } from '@apollo/client';
import { StateContext } from "./StateContext";
import { DispatchContext } from "./DispatchContext";
import { SharedDataModel } from "./models/SharedData"
import Axios from "axios"

Axios.defaults.baseURL = nodejsEndpoint;

const woocommerce = new HttpLink({
    uri: graphqlEndpoint
})
const magento = new HttpLink({
    uri: magentographqlEndpoint
})

const client = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().clientName === 'magento',
        magento,
        woocommerce
    ),
    cache: new InMemoryCache()
});

const queryClient = new QueryClient()

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

root.render(
            <QueryClientProvider client={queryClient}>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </QueryClientProvider>
)

