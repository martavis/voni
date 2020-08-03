import path from 'path';

import ApolloClient from 'apollo-client';
import fetch from 'isomorphic-fetch'; 
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { 
    GET_FEATURED_COLLECTION,
    GET_ALL_PRODUCTS
} from './gql';

export const gqlClient = new ApolloClient({
    link: new HttpLink({ uri: process.env.VENDURE_API_URL, fetch: fetch }),
    cache: new InMemoryCache(),
});

export default {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    getRoutes: async () => {
        const {data: { collection }} = await gqlClient.query({
            query: GET_FEATURED_COLLECTION,
            fetchPolicy: 'no-cache'
        });
        
        const {data: { products }} = await gqlClient.query({
            query: GET_ALL_PRODUCTS,
            fetchPolicy: 'no-cache'
        });

        return [
            {
                path: '/',
                getData: () => ({
                    collection
                })
            },
            {
                path: '/about',
            },
            {
                path: '/contact',
            },
            {
                path: '/ambassador',
            },
            {
                path: '/shop',
                getData: () => ({
                    products
                }),
                children: products.items.map((product) => ({
                    path: `/product/${product.slug}`,
                    template: 'src/pages/product',
                    getData: () => ({
                        product
                    }),
                }))
            },
        ]
    },
    plugins: [
        'react-static-plugin-typescript',
        [
            require.resolve('react-static-plugin-source-filesystem'),
            {
                location: path.resolve('./src/pages'),
            },
        ],
        require.resolve('react-static-plugin-reach-router'),
        require.resolve('react-static-plugin-sitemap'),
        require.resolve('react-static-plugin-sass'),
    ],
}
