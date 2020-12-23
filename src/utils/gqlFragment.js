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
    fragment Cart on CheckoutCreatePayload {
        checkout {
            id
            lineItems(first: 5) {
                edges {
                    node {
                        id
                        title
                        quantity
                    }
                }
            }
        }
    }
`;

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
