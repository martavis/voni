import React, { SyntheticEvent } from 'react';

import './ItemCounter.scss';

type Props = {
    count: number
    setCount: Function
    lineId?: string,
    checkoutId?: string
};

const ItemCounter = ({ count, setCount, lineId, checkoutId }: Props) => {
    const handleClick = (additive: number) => (e: SyntheticEvent) => {
        e.preventDefault();

        let newCount = count;
        newCount = (newCount + additive < 1) ? 1 : newCount + additive;

        // updating the cart quantity automatically
        if (checkoutId) {
            setCount(checkoutId, newCount, lineId);
        } else {
            setCount(newCount);
        }
    };
    
    return (
        <div className="item-counter-component">
            <div className="counter-text">
                <div className="count-modifier add" role="button" onClick={handleClick(1)}>
                    <img alt="add one" src="https://storage.googleapis.com/voni-assets/img/plus.png" />
                </div>
                <span>{count}</span>
                <div className="count-modifier subtract" role="button" onClick={handleClick(-1)}>
                    <img alt="subtract one" src="https://storage.googleapis.com/voni-assets/img/minus.png" />
                </div>
            </div>
        </div>
	);
};

export default ItemCounter;
