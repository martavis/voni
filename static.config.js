import path from 'path';
import gqlClient from './src/utils/gqlClient';
import { GET_ALL_PRODUCTS } from './src/utils/gqlQuery';

export default {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    getRoutes: async () => {
        const {data: { products }} = await gqlClient.query({
            query: GET_ALL_PRODUCTS,
            fetchPolicy: 'no-cache'
        });
        
        return [
            {
                path: '/',
                getData: () => ({
                    products
                })
            },
            {
                path: '/shop',
                getData: () => ({
                    products,
                }),
                children: products.edges.map((product) => ({
                    path: `/product/${product.node.handle}`,
                    template: 'src/pages/product',
                    getData: () => ({
                        product: product.node
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
