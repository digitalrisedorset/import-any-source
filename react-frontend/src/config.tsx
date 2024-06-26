// This is client side config only - don't put anything in here that shouldn't be public!
export const graphqlEndpoint = `http://${process.env.REACT_APP_KEYSTONE_HOST}/api/graphql`;

export const nodejsEndpoint = `http://${process.env.REACT_APP_NODE_HOST}`;

export const magentographqlEndpoint = `${process.env.REACT_APP_MAGENTO_HOST}/graphql`;