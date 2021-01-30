import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import './Orders.scss';

const Orders = () => { 
    const [orders, setOrders] = useState('');

    return ( 
        <div className="orders">
            Orders
        </div>
    )
}

export default Orders;