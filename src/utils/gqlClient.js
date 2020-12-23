import fetch from 'isomorphic-fetch'; 
import { 
    ApolloClient, 
    createHttpLink, 
    InMemoryCache 
} from '@apollo/client';

const httpLink = new createHttpLink({ 
    uri: process.env.SHOPIFY_STORE_URL, 
    headers: {
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_PKEY,
        'Accept': 'application/graphql'
    },
    fetch
});

const gqlClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default gqlClient;