import gql from 'graphql-tag';
import { CART_FRAGMENT } from './gqlFragment';

export const CREATE_CART = gql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
        cart: checkoutCreate(input: $input) {
            checkout {
                ...Cart
            }
        }
    }
    ${CART_FRAGMENT}
`;

export const ADD_MORE_TO_CART = gql`
    mutation checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
        cart: checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
            checkout {
                ...Cart
            }
        }
    }
    ${CART_FRAGMENT}
`;

export const MODIFY_CART = gql`
    mutation checkoutLineItemsReplace($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
        cart: checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
            checkout {
                ...Cart
            }
        }
    }
    ${CART_FRAGMENT}
`;

export const REMOVE_FROM_CART = gql`
    mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
        cart: checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
            checkout {
                ...Cart
            }
        }
    }
    ${CART_FRAGMENT}
`;

export const REGISTER_ACCOUNT = gql`
    mutation registerAccount($input: CustomerCreateInput!) {
        result: customerCreate(input: $input) {
            customer {
                id
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($input: CustomerAccessTokenCreateInput!) {
        result: customerAccessTokenCreate(input: $input) {
            customerAccessToken {
                accessToken
                expiresAt
            }
        }
    }
`;

export const LOGOUT = gql`
    mutation logout($customerAccessToken: String!) {
        customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
            deletedAccessToken
        }
    }
`;

export const UPDATE_CUSTOMER = gql`
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
            customer {
                id
            }
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;

export const CREATE_ADDRESS = gql`
    mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
        customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
            customerAddress {
                id
            }
        }
    }
`;

export const UPDATE_ADDRESS = gql`
    mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
        customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
            customerAddress {
                id
            }
        }
    }
`;