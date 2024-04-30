import { graphqlEndpoint, magentographqlEndpoint, nodejsEndpoint } from './config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { QueryClient, QueryClientProvider } from 'react-query'
import { HttpLink, ApolloLink } from '@apollo/client';
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
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

function Main() {
    const sharedData = SharedDataModel()

    return (
        <React.StrictMode>
            <StateContext.Provider value={sharedData.state}>
                <DispatchContext.Provider value={sharedData.dispatch}>
                    <QueryClientProvider client={queryClient}>
                        <ApolloProvider client={client}>
                            <App sharedState={sharedData.state} />
                        </ApolloProvider>
                    </QueryClientProvider>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </React.StrictMode>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
