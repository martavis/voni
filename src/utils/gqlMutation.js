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

export const SET_CHECKOUT_SHIPPING_ADDRESS = gql`
    mutation checkoutShippingAddressUpdateV2($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
        cart: checkoutShippingAddressUpdateV2(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
            checkout {
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

export const SET_CHECKOUT_EMAIL = gql`
    mutation checkoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
        cart: checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
            checkout {
                ...Cart
            }
        }
    }
    ${CART_FRAGMENT}
`;

export const SET_SHIPPING_METHOD = gql`
    mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
        cart: checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
            checkout {
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

