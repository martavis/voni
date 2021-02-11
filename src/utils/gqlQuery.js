import gql from 'graphql-tag';
import { CART_FRAGMENT, SHOP_POLICY_FRAGMENT } from './gqlFragment';

export const GET_ALL_PRODUCTS = gql`
    query {
        products(first: 10) {
            edges {
                node {
                    id
                    title
                    handle
                    description
                    totalInventory
                    options {
                        id
                        name,
                        values
                    }
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                        maxVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                    variants(first: 20) {
                        edges {
                            node {
                                id
                                image {
                                    originalSrc
                                }
                                quantityAvailable
                                title
                                currentlyNotInStock
                                priceV2 {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_SHOP_DATA = gql`
    query {
        shop {
            description
            moneyFormat
            name
            privacyPolicy {
                ...policy
            }
            refundPolicy {
                ...policy
            }
            shippingPolicy {
                ...policy 
            }
            shipsToCountries
            termsOfService {
                ...policy
            }
        }
    }
    ${SHOP_POLICY_FRAGMENT}
`;

export const GET_CHECKOUT = gql`
    query getCheckoutById($checkoutId: ID!) {
        node(id: $checkoutId) {
            id
            ... on Checkout {
                ...Cart
                availableShippingRates {
                    ready
                    shippingRates {
                        handle
                        priceV2 {
                            amount
                        }
                        title
                    }
                }
            }
        }
    }
    ${CART_FRAGMENT}
`;

export const GET_CUSTOMER = gql`
    query customer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            id
            firstName
            lastName
            phone
            addresses(first: 1) {
                edges {
                    node {
                        id
                        firstName
                        lastName
                        address1
                        address2
                        city
                        province
                        country
                        zip
                    }
                }
            }
        }
    }
`;

export const GET_CUSTOMER_ORDERS = gql`
    query customer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            orders(first: 20) {
                edges {
                    node {
                        orderNumber
                        customerUrl
                        financialStatus
                        fulfillmentStatus
                        processedAt
                        totalPriceV2 {
                            amount
                        }
                    }
                }
            }
        }
    }
`;

