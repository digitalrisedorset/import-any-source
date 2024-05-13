import {ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import {graphqlEndpoint, magentographqlEndpoint} from "./config";

const woocommerce = new HttpLink({
    uri: graphqlEndpoint
})
const magento = new HttpLink({
    uri: magentographqlEndpoint
})

export const apolloClient = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().clientName === 'magento',
        magento,
        woocommerce
    ),
    cache: new InMemoryCache()
});

apolloClient.clearStore();
