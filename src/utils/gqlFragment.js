import gql from 'graphql-tag';

export const COUNTRY_FRAGMENT = gql`
    fragment Country on Country {
        id
        code
        name
        enabled
    }
`;

export const CART_FRAGMENT = gql`
    fragment Cart on Checkout {
        id
        email
        note
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

// ============== OLD v1 ============= //

export const REGISTER_CUSTOMER_ACCOUNT_RESULT = gql`
    fragment RegisterResult on RegisterCustomerAccountResult {
        ... on Success{
            success
        }
    }
`;

export const NATIVE_AUTHENTICATION_RESULT = gql`
    fragment LoginResult on NativeAuthenticationResult {
        ... on CurrentUser{
            id,
            identifier,
            channels { 
                id,
                token,
                code
            }
        }
    }
`;

export const LOGOUT_RESULT = gql`
    fragment Result on Success { 
        success
    }
`;

export const ADDRESS_FRAGMENT = gql`
    fragment Address on Address {
        id
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
            id
            code
            name
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
    }
`;

export const ERROR_RESULT_FRAGMENT = gql`
    fragment ErrorResult on ErrorResult {
        errorCode
        message
    }
`;

export const ORDER_ADDRESS_FRAGMENT = gql`
    fragment OrderAddress on OrderAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        phoneNumber
    }
`;
