export type configInfo = {
    graphqlEndpoint: string,
    nodejsEndpoint: string,
    magentographqlEndpoint: string
}

export const config: configInfo = {
    // graphqlEndpoint: (process.env.REACT_APP_KEYSTONE_HOST === undefined) ? 'http://localhost:3000/api/graphql' : `http://${process.env.REACT_APP_KEYSTONE_HOST}/api/graphql`,
    // nodejsEndpoint: (process.env.REACT_APP_NODE_HOST === undefined) ? 'http://localhost:8080' : `http://${process.env.REACT_APP_NODE_HOST}`,
    // magentographqlEndpoint: (process.env.REACT_APP_MAGENTO_HOST === undefined) ? 'http://magentodevelop24.com' : process.env.REACT_APP_MAGENTO_HOST
    graphqlEndpoint: `http://${process.env.REACT_APP_KEYSTONE_HOST}/api/graphql`,
    nodejsEndpoint: `http://${process.env.REACT_APP_NODE_HOST}`,
    magentographqlEndpoint: `${process.env.REACT_APP_MAGENTO_HOST}/graphql`
}
