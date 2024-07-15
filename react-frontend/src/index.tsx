import { config } from './config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from "react-redux";
import { store } from './state'
import Axios from "axios"
import { apolloClient } from './apolloclient'

const queryClient = new QueryClient()

Axios.defaults.baseURL = config.nodejsEndpoint;

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

root.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <ApolloProvider client={apolloClient}>
                <App />
            </ApolloProvider>
        </QueryClientProvider>
    </Provider>
)

