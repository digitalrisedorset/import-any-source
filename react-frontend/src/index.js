import {graphqlEndpoint, magentographqlEndpoint} from './config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import {QueryClient, QueryClientProvider} from 'react-query'
import { HttpLink, ApolloLink } from '@apollo/client';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
