import React, { createContext, useReducer, ReactNode } from 'react';
import { Checkout } from 'shopify-storefront-api-typings';

type Props = {
    children: ReactNode;
};

type InitialStateType = {
    cart: Checkout | null,
    setCart: Function
};

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || null,
    setCart: () => {}
};

const actions = {
    SET_CART: 'SET_CART'
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actions.SET_CART:
            if (action.cart) {
                localStorage.setItem('cart', JSON.stringify(action.cart));
            } else {
                localStorage.removeItem('cart');
            }
            return { ...state, cart: action.cart };
        default:
            return state;
    }
};

export const CartContext = createContext<InitialStateType>(initialState);

const CartProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = {
        cart: state.cart,
        setCart: (cart: Checkout | null) => {
            dispatch({ type: actions.SET_CART, cart });
        }
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;