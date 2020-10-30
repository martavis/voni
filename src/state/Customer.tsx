import React, { createContext, useReducer, ReactNode } from 'react';
import { Customer } from 'types/vendure';

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
    customer: JSON.parse(localStorage.getItem('customerStorage')) || null,
    setCustomer: () => {},
    token: JSON.parse(localStorage.getItem('tokenStorage')) || null,
    setToken: () => {}
};

const actions = {
    SET_CUSTOMER: 'SET_CUSTOMER',
    SET_TOKEN: 'SET_TOKEN'
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actions.SET_CUSTOMER:
            localStorage.setItem('customerStorage', JSON.stringify(action.customer));
            return { ...state, customer: action.customer };
        case actions.SET_TOKEN:
            localStorage.setItem('tokenStorage', action.token);
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
        setToken: (token: String | null) => { 
            dispatch({ type: actions.SET_TOKEN, token });
        }
    };

    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    );
};

export default CustomerProvider;