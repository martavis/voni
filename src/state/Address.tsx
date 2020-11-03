import React, { createContext, useReducer, ReactNode } from 'react';
import { Address } from 'types/vendure';

type Props = {
    children: ReactNode;
};

type InitialStateType = {
    shippingAddress: Address | null,
    setShippingAddress: Function,
    paymentAddress: Address | null, 
    setPaymentAddress: Function
};

const initialState = {
    shippingAddress: JSON.parse(localStorage.getItem('shipaddress') != undefined ? localStorage.getItem('customerStorage') : null) || null,
    setShippingAddress: () => {},    
    paymentAddress: JSON.parse(localStorage.getItem('paymentaddress') != undefined ? localStorage.getItem('customerStorage') : null) || null,
    setPaymentAddress: () => {}
};

const actions = {
    SET_SHIP_ADDRSS: 'SET_SHIP_ADDRSS',
    SET_PAYMENT_ADDRSS: 'SET_PAYMENT_ADDRSS'
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actions.SET_SHIP_ADDRSS:
            localStorage.setItem('shipaddress', JSON.stringify(action.shipAddress));
            return { ...state, customer: action.customer };
        case actions.SET_PAYMENT_ADDRSS:
            localStorage.setItem('paymentaddress', action.paymentAddress);
            return { ...state, token: action.token };
        default:
            return state;
    }
};

export const AddressContext = createContext<InitialStateType>(initialState);

const AddressProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {
        shippingAddress: state.shippingAddress,
        setShippingAddress: (shipAddress: Address | null) => {
            console.log(shipAddress);
            dispatch({ type: actions.SET_SHIP_ADDRSS, shipAddress });
        },
        paymentAddress: state.paymentAddress,
        setPaymentAddress: (paymentAddress: Address | null) => { 
            dispatch({ type: actions.SET_PAYMENT_ADDRSS, paymentAddress });
        }
    };

    return (
        <AddressContext.Provider value={value}>
            {children}
        </AddressContext.Provider>
    );
};

export default AddressProvider;