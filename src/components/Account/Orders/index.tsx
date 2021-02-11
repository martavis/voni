import React, { useEffect, useState, useContext } from 'react';
import { Link } from '@reach/router';
import { CustomerContext } from 'state/Customer';
import gqlClient from 'utils/gqlClient';
import { GET_CUSTOMER_ORDERS } from 'utils/gqlQuery';
import { formatPrice } from 'utils/functions'
import { OrderConnection, OrderEdge } from 'shopify-storefront-api-typings';

import './Orders.scss';

const Orders = () => { 
    const [orders, setOrders] = useState<OrderConnection | null>(null);
    const { token }: { token: String } = useContext(CustomerContext);

    useEffect(() => {
        const getOrders = async () => {
            const { data: { customer: { orders } } } = await gqlClient.query({
                query: GET_CUSTOMER_ORDERS,
                fetchPolicy: 'no-cache',
                variables: { customerAccessToken: token }
            });

            if (orders) {
                setOrders(orders);
            }
        };

        getOrders();
    }, []);

    if (!orders || orders.edges.length === 0) {
        return (
            <div className="orders">
                <p className="no-orders">No orders have been made. Click <Link to="/shop">here</Link> to start shopping.</p>
            </div>
        )
    }

    return ( 
        <div className="orders">
            <div className="orders-table">
                <div className="o-header">
                    <div>Order #</div>
                    <div>Date</div>
                    <div>Total</div>
                    <div>Payment</div>
                    <div>Fullfillment</div>
                </div>
                <div className="o-body">{
                    orders.edges.map(({ node: { 
                        orderNumber, 
                        customerUrl, 
                        financialStatus, 
                        fulfillmentStatus, 
                        processedAt, 
                        totalPriceV2 
                    }}: OrderEdge, i: number) => {
                        const date = new Date(processedAt);
                        const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

                        return (
                            <a key={i} href={customerUrl}>
                                <div className="o-row">
                                    <div>{orderNumber}</div>
                                    <div>{dateStr}</div>
                                    <div>${formatPrice(totalPriceV2.amount)}</div>
                                    <div>{financialStatus}</div>
                                    <div>{fulfillmentStatus}</div>
                                </div>
                            </a>
                        );
                    })
                }</div>
            </div>
        </div>
    )
}

export default Orders;