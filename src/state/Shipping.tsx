import React, { createContext, useReducer, ReactNode } from 'react';
import { isLocalStorageAvailable } from 'utils/functions';
import { MailingAddress } from 'shopify-storefront-api-typings';

type Props = {
    children: ReactNode;
};

type InitialStateType = {
    shipping: MailingAddress | null,
    setShipping: Function,
};

const initialState = {
    shipping: isLocalStorageAvailable() && JSON.parse(localStorage.getItem('shipping') !== undefined ? localStorage.getItem('shipping') : null) || null,
    setShipping: () => {},    
};

const actions = {
    SET_SHIPPING: 'SET_SHIPPING',
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actions.SET_SHIPPING:
            if (action.shipping === null) {
                isLocalStorageAvailable() && localStorage.removeItem('shipping');
            } else {
                isLocalStorageAvailable() && localStorage.setItem('shipping', JSON.stringify(action.shipping));
            }
            return { ...state, shipping: action.shipping };
        default:
            return state;
    }
};

export const ShippingContext = createContext<InitialStateType>(initialState);

const ShippingProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {
        shipping: state.shipping,
        setShipping: (shipping: MailingAddress | null) => {
            dispatch({ type: actions.SET_SHIPPING, shipping });
        }
    };

    return (
        <ShippingContext.Provider value={value}>
            {children}
        </ShippingContext.Provider>
    );
};

export default ShippingProvider;