import {ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import {config} from "./config";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const keystone = ApolloLink.from([
    // this uses apollo-link-http under the hood, so all the options here come from that package
    createUploadLink({
        uri: config.keystone.graphqlEndpoint,
        credentials: 'include',
        headers: {
            'apollo-require-preflight': 'true'
        }
    }),
]);

const magento = new HttpLink({
    uri: config.magentographqlEndpoint
})

export const apolloClient = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().clientName === 'magento',
        magento,
        keystone
    ),
    cache: new InMemoryCache()
});

apolloClient.clearStore();
