import gql from 'graphql-tag';

export const CART_FRAGMENT = gql`
    fragment Cart on Checkout {
        id
        email
        note
        webUrl
        order {
            id
            email
            fulfillmentStatus
            orderNumber
            processedAt
            totalPriceV2 {
                amount
            }
        }
        shippingAddress {
            address1	
            address2	
            city	
            company	
            country	
            firstName	
            lastName	
            phone	
            province	
            zip
        }
        shippingLine {
            handle
            priceV2 {
                amount
            }
            title
        }
        subtotalPriceV2 {
            amount
        }
        totalPriceV2 {
            amount
        }
        totalTaxV2 {
            amount
        }
        lineItems(first: 5) {
            edges {
                node {
                    id
                    title
                    quantity
                    variant {
                        id
                        title
                        unitPrice {
                            amount
                        }
                        priceV2 {
                            amount
                        }
                        image {
                            originalSrc
                        }
                    }
                }
            }
        }
    }
`;

export const SHOP_POLICY_FRAGMENT = gql`
    fragment policy on ShopPolicy {
        body
        handle
        title
        url
    }
`;

