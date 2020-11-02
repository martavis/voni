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