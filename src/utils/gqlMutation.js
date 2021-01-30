import gql from 'graphql-tag';
import { ORDER_ADDRESS_FRAGMENT, CART_FRAGMENT, REGISTER_CUSTOMER_ACCOUNT_RESULT, NATIVE_AUTHENTICATION_RESULT, 
    LOGOUT_RESULT, ADDRESS_FRAGMENT, ERROR_RESULT_FRAGMENT } from './gqlFragment';

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

// export const CREATE_PROFILE_SHIPPING_ADDRESS = gql`
//     mutation customerAddressCreate($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
//         profile: customerAddressCreate(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
//             checkout {
//                 ...Cart
//             }
//         }
//     }
//     ${CART_FRAGMENT}
// `;

// export const UPDATE_PROFILE_SHIPPING_ADDRESS = gql`
//     mutation customerAddressCreate($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
//         profile: customerAddressCreate(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
//             checkout {
//                 ...Cart
//             }
//         }
//     }
//     ${CART_FRAGMENT}
// `;

// ============== OLD v1 ============= //

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

// export const REMOVE_FROM_CART = gql`
//     mutation removeFromCart($orderLineId: ID!) {
//         cart: removeOrderLine(orderLineId: $orderLineId) {
//             ...Cart
//         }
//     }
//     ${CART_FRAGMENT}
// `;

// export const SET_SHIPPING_ADDRESS = gql`
//     mutation SetShippingAddress($input: CreateAddressInput!) {
//         setOrderShippingAddress(input: $input) {
//             ...Cart
//             shippingAddress {
//                 ...OrderAddress
//             }
//         }
//     }
//     ${CART_FRAGMENT}
//     ${ORDER_ADDRESS_FRAGMENT}
// `;

// export const SET_SHIPPING_METHOD = gql`
//     mutation SetShippingMethod($id: ID!) {
//         setOrderShippingMethod(shippingMethodId: $id) {
//             ...Cart
//             ...ErrorResult
//         }
//     }
//     ${CART_FRAGMENT}
//     ${ERROR_RESULT_FRAGMENT}
// `;

// export const REGISTER_ACCOUNT = gql`
//     mutation registerAccount($customerAccount: RegisterCustomerInput!) {
//         registerCustomerAccount(input: $customerAccount) {
//             ...RegisterResult
//         }
//     }
//     ${REGISTER_CUSTOMER_ACCOUNT_RESULT}
// `;

// export const LOGIN = gql`
//     mutation login($userName: String!, $password: String!, $rememberMe: Boolean) {
//         login(username: $userName, password: $password, rememberMe: $rememberMe) {     
//             ...LoginResult
//         }
//     }
//     ${NATIVE_AUTHENTICATION_RESULT}
// `;

// export const LOGOUT = gql`
//     mutation {
//         logout {     
//             ...Result
//         }
//     }
//     ${LOGOUT_RESULT}
// `;

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

export const UPDATE_ADDRESS = gql`
    mutation UpdateAddress($input: UpdateAddressInput!) {
        updateCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;

export const CREATE_ADDRESS = gql`
    mutation CreateAddress($input: CreateAddressInput!) {
        createCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($old: String! $new: String!) {
        updateCustomerPassword(currentPassword: $old newPassword: $new) {
            ... on Success {
                success
            }
            ...ErrorResult
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;

