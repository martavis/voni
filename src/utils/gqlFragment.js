import gql from 'graphql-tag';


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