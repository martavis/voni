import React, { createContext, useReducer, ReactNode } from 'react';
import { isLocalStorageAvailable } from 'utils/functions';
import { Customer } from 'shopify-storefront-api-typings';
import Cookies from 'js-cookie';

type Props = {
    children: ReactNode;
};

type InitialStateType = {
    customer: Customer | null,
    setCustomer: Function,
    token: String,
    setToken: Function
};

const initialState = {
    customer: isLocalStorageAvailable() && JSON.parse(localStorage.getItem('customer') !== undefined ? localStorage.getItem('customer') : null) || null,
    setCustomer: () => {},    
    token: Cookies.get('vtok') || null,
    setToken: () => {}
};

const actions = {
    SET_CUSTOMER: 'SET_CUSTOMER',
    SET_TOKEN: 'SET_TOKEN'
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actions.SET_CUSTOMER:
            if (action.customer === null) {
                isLocalStorageAvailable() && localStorage.removeItem('customer');
            } else {
                isLocalStorageAvailable() && localStorage.setItem('customer', JSON.stringify(action.customer));
            }
            return { ...state, customer: action.customer };
        case actions.SET_TOKEN:
            if (action.token === null) {
                Cookies.remove('vtok');
            } else {
                Cookies.set('vtok', action.token, { expires: action.expires });
            }
            return { ...state, token: action.token };
        default:
            return state;
    }
};

export const CustomerContext = createContext<InitialStateType>(initialState);

const CustomerProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {
        customer: state.customer,
        setCustomer: (customer: Customer | null) => {
            dispatch({ type: actions.SET_CUSTOMER, customer });
        },
        token: state.token,
        setToken: (token: String | null, expires: Date | null | undefined) => { 
            dispatch({ type: actions.SET_TOKEN, token, expires });
        }
    };

    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    );
};

export default CustomerProvider;