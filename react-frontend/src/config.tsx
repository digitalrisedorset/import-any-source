export type Theme = {
    name: string,
    colors: ThemeColors
}

export type ThemeColors = {
    font: string,
    deep: string,
    normal: string,
    light: string
}

export type configInfo = {
    keystone: {
        graphqlEndpoint: string,
        headers: {
            'apollo-require-preflight': string
        }
    },
    access: {
        canTriggerImport: boolean,
        canMonitorUpdate: boolean,
        canMonitorDelete: boolean,
        canMapAttribute: boolean,
    },
    nodejsEndpoint: string,
    magentographqlEndpoint: string
    themes: Theme[]
}

export const config: configInfo = {
    nodejsEndpoint: (process.env.REACT_APP_NODE_HOST === undefined) ? 'http://localhost:8080' : process.env.REACT_APP_NODE_HOST,
    magentographqlEndpoint: process.env.REACT_APP_MAGENTO_HOST === undefined ? 'http://magentodevelop24.com/graphql' : `${process.env.REACT_APP_MAGENTO_HOST}/graphql`,
    keystone: {
        graphqlEndpoint: (process.env.REACT_APP_KEYSTONE_HOST === undefined) ? 'http://localhost:3000/api/graphql' : `${process.env.REACT_APP_KEYSTONE_HOST}/api/graphql`,
        headers: {
            'apollo-require-preflight': (process.env.REACT_REQUIRE_PREFLIGHT)? 'true': 'false'
        }
    },
    access: {
        canTriggerImport: true,
        canMonitorUpdate: true,
        canMonitorDelete: true,
        canMapAttribute: true,
    },
    themes: [{
        name: 'blue',
        colors: { // more themes at: https://webflow.com/blog/elegant-color-palettes
            font: 'black',
            deep: '#0077B6',
            normal: '#2f4e87',
            light: '#D1E8E2'
        }
    }, {
        name: 'red',
        colors: {
            font: '#3A3A3A',
            deep: '#ff0000',
            normal: '#393939',
            light: '#3A3A3A'
        }
    },
    {
        name: 'happy',
        colors: {
            font: 'black',
            deep: '#FF9F1C',
            normal: '#FFBF69',
            light: '#CB997E'
        }
    },
    {
        name: 'forest',
        colors: {
            font: 'black',
            deep: '#2B9348',
            normal: '#80B918',
            light: '#CB997E'
        }
    }]
}

console.log(config)