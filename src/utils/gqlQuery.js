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

export const GET_ACTIVE_CUSTOMER = gql`
    query {
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

export const GET_ME = gql`
    query {
        me {
            id            
        }
    }
`;
