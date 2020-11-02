import path from 'path';
import gqlClient from './src/utils/gqlClient';

import { 
    GET_ALL_COLLECTIONS,
    GET_FEATURED_COLLECTION,
    GET_ALL_PRODUCTS
} from './src/utils/gqlQuery';

export default {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    getRoutes: async () => {
        const {data: { collections }} = await gqlClient.query({
            query: GET_ALL_COLLECTIONS,
            fetchPolicy: 'no-cache'
        });

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
                path: '/shop',
                getData: () => ({
                    products,
                    collections: collections.items.filter(c => c.slug !== 'featured')
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
