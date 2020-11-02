import gql from 'graphql-tag';
import { CART_FRAGMENT, REGISTER_CUSTOMER_ACCOUNT_RESULT, NATIVE_AUTHENTICATION_RESULT, LOGOUT_RESULT } from './gqlFragment';

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


export const REGISTER_ACCOUNT = gql`
    mutation registerAccount($customerAccount: RegisterCustomerInput!) {
        registerCustomerAccount(input: $customerAccount) {
            ...RegisterResult
        }
    }
    ${REGISTER_CUSTOMER_ACCOUNT_RESULT}
`;

export const LOGIN = gql`
    mutation login($userName: String!, $password: String!, $rememberMe: Boolean) {
        login(username: $userName, password: $password, rememberMe: $rememberMe) {     
            ...LoginResult
        }
    }
    ${NATIVE_AUTHENTICATION_RESULT}
`;

export const LOGOUT = gql`
    mutation {
        logout {     
            ...Result
        }
    }
    ${LOGOUT_RESULT}
`;

export const UPDATE_CUSTOMER_DETAILS = gql`
    mutation UpdateCustomerDetails($input: UpdateCustomerInput!) {
        updateCustomer(input: $input) {
            id
            firstName
            lastName
            emailAddress
            phoneNumber
        }
    }
`;
