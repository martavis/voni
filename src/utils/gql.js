import gql from 'graphql-tag';

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

export const GET_ALL_PRODUCTS = gql`
    query {
        products {
            items {
                id
                name
                slug
                description
                collections {
                    id
                    name
                    slug
                }
                featuredAsset {
                    source
                }
                assets {
                    source
                }
                variants {
                    id
                    sku
                    name
                    featuredAsset{
                        source
                    }
                    assets {
                        source
                    }
                    price
                    currencyCode
                    priceWithTax
                    priceIncludesTax
                }
                optionGroups {
                    options {
                        name
                    }
                }
            }
            totalItems
        }
    }
`;

const CART_FRAGMENT = gql`
    fragment Cart on Order {
        id
        code
        state
        active
        lines {
            id
            featuredAsset {
                source
            }
            unitPrice
            unitPriceWithTax
            quantity
            totalPrice
            productVariant {
                id
                name
            }
            adjustments {
                amount
                description
                adjustmentSource
                type
            }
        }
        subTotal
        subTotalBeforeTax
        totalBeforeTax
        shipping
        shippingMethod {
            id
            code
            description
        }
        total
        adjustments {
            amount
            description
            adjustmentSource
            type
        }
    }
`;

export const ADD_TO_CART = gql`
    mutation addToCart($productVariantId: ID!, $quantity: Int!) {
        cart: addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const ADJUST_ITEM_QUANTITY = gql`
    mutation adjustItemQuantity($orderLineId: ID!, $quantity: Int) {
        cart: adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const REMOVE_FROM_CART = gql`
    mutation removeFromCart($orderLineId: ID!) {
        cart: removeOrderLine(orderLineId: $orderLineId) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;