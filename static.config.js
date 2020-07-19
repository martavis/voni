import axios from 'axios'
import path from 'path'
// import { Post } from './types'

// Typescript support in static.config.js is not yet supported, but is coming in a future update!

export default {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    getRoutes: async () => {
        const { data: storeItems } /* :{ data: Post[] } */ = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return [
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
                    storeItems,
                }),
                children: storeItems.map((item /* : Post */) => ({
                    path: `/shop/${item.slug}`,
                    template: 'src/containers/StoreItem',
                    getData: () => ({
                        item,
                    }),
                })),
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
