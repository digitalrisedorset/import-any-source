import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const keystone = new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
})

// imports and init code
export const client = new ApolloClient({
    link: keystone,
    cache: new InMemoryCache(),
})