import ApolloClient from 'apollo-client';
import fetch from 'isomorphic-fetch'; 
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, ApolloLink, concat } from '@apollo/client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';


const httpLink = new HttpLink({ 
    uri: process.env.VENDURE_API_URL, 
    fetch: fetch,
    credentials: 'include'
});

// const wsLink = process.browser ? new WebSocketLink(
//     new SubscriptionClient(process.env.VENDURE_WS_URL || '', {
//         reconnect: true,
//         timeout: 30000
//     })
// ) : null;

// const splitLink = process.browser ? split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         );
//     },
//     wsLink,
//     httpLink,
// ) : httpLink;

const gqlClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: 'include'
});

export default gqlClient;