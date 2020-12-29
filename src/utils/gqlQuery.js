import gql from 'graphql-tag';
import { CART_FRAGMENT, SHOP_POLICY_FRAGMENT, COUNTRY_FRAGMENT, ADDRESS_FRAGMENT, ORDER_ADDRESS_FRAGMENT } from './gqlFragment';

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
                    variants(first: 10) {
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

// ============== OLD v1 ============= //

export const GET_ALL_COLLECTIONS = gql`
    query {
        collections {
            items {
                id
                name
                slug
            }
            totalItems
        }
    }
`;

export const GET_FEATURED_COLLECTION = gql`
    query {
        collection(slug: "featured") {
            id
            name
            slug
            productVariants {
                items {
                    id
                    product {
                        name
                        slug
                        description
                        featuredAsset {
                            source
                        }
                        assets {
                            source
                        }
                        variants {
                            id
                            product {
                                name
                                slug
                                description
                                featuredAsset {
                                    source
                                }
                                assets {
                                    source
                                }
                            }
                            productId
                            sku
                            name
                            featuredAsset {
                                source
                            }
                            assets {
                                source
                            }
                            price
                            currencyCode
                            priceIncludesTax
                            priceWithTax
                            options {
                                id
                                code
                                name
                                groupId
                            }
                        }
                    }
                    productId
                    sku
                    name
                    featuredAsset {
                        source
                    }
                    assets {
                        source
                    }
                    price
                    currencyCode
                    priceIncludesTax
                    priceWithTax
                    options {
                        id
                        code
                        name
                        groupId
                    }
                }
                totalItems
            }
        }
    }
`;

// export const GET_ALL_PRODUCTS = gql`
//     query {
//         products {
//             items {
//                 id
//                 name
//                 slug
//                 description
//                 collections {
//                     id
//                     name
//                     slug
//                 }
//                 featuredAsset {
//                     source
//                 }
//                 assets {
//                     source
//                 }
//                 variants {
//                     id
//                     sku
//                     name
//                     featuredAsset{
//                         source
//                     }
//                     assets {
//                         source
//                     }
//                     price
//                     currencyCode
//                     priceWithTax
//                     priceIncludesTax
//                 }
//                 optionGroups {
//                     options {
//                         name
//                     }
//                 }
//             }
//             totalItems
//         }
//     }
// `;

export const GET_ACTIVE_CUSTOMER = gql`
    query GetActiveCustomer {
        activeCustomer {
            id
            title
            firstName
            lastName
            emailAddress
            phoneNumber
        }
    }
`;

export const GET_CUSTOMER_ADDRESSES = gql`
    query GetCustomerAddresses {
        activeCustomer {
            id
            addresses {
                ...Address
            }
        }
    }
    ${ADDRESS_FRAGMENT}
`;

export const GET_ME = gql`
    query {
        me {
            id            
        }
    }
`;

export const GET_AVAILABLE_COUNTRIES = gql`
    query GetAvailableCountries {
        availableCountries {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;

export const GET_SHIPPING_ADDRESS = gql`
    query GetShippingAddress {
        activeOrder {
            id
            shippingAddress {
                ...OrderAddress
            }
        }
    }
    ${ORDER_ADDRESS_FRAGMENT}
`;

