import React, { useState, useEffect, useContext } from 'react';
import { GET_CUSTOMER_ADDRESSES } from 'utils/gqlQuery';
import { CustomerContext } from 'state/Customer';
import gqlClient from 'utils/gqlClient';
import { Link } from '@reach/router';

import ShippingInfo from 'components/Profile/ShippingInfo'
import './Payment.scss';

const CheckoutPayment = () => {	
    let ShipMethod = "UPSP First Class Package International - $18";
    const { customer }  = useContext(CustomerContext);
    const [uAddress, setUAddress] = useState({   
        id: '',     
        streetLine1: '', 
        streetLine2: '',
        city: '',
        province: '',
        postalCode: '',
        country : { 
            code : '', 
            name : ''
        }
    });
    let [billMethod, setBillMethod] = useState(0);

    useEffect( () => { 
        getCustomerAddress();
    }, []); 

    let getCustomerAddress = async () => { 
        const {data: data } = await gqlClient.query({
            query: GET_CUSTOMER_ADDRESSES,
            fetchPolicy: 'no-cache'
        });
        if(data.activeCustomer.addresses[0]) { 
            setUAddress(data.activeCustomer.addresses[0]);
        } else { 
            
        }
    }
    const onSubmit = () => { 
	
    }    
    return (
        <div className="checkoutPayment">
            <div className="input-clip-path-outside"> 
				<div className="input-clip-path-inside contact-info"> 
					<div>
						Contact: 
						<span>{customer.emailAddress}</span>
						<Link to="/checkout">CHANGE</Link>
					</div> 
					<div>
						Ship to: 
						<span>{uAddress.streetLine1 + ', ' + uAddress. streetLine2 + ', ' +  uAddress.city
								+ ' ' + uAddress.province + ', ' + uAddress.postalCode + ', ' + uAddress.country.name}</span>
						<Link to="/checkout">CHANGE</Link>
					</div>	
                    <div>
						Method: 
						<span>{ShipMethod}</span>
						<Link to="/checkout">CHANGE</Link>
					</div>				
				</div>
			</div>
            <p className="title">
				PAYMENT
			</p>
            <p className="sub-title">
                All transactions are secure and encrypted.
            </p> 
            <div className="input-clip-path-outside">
				<input placeholder="Card number" className="input-clip-path-inside"></input>
			</div>
            <div className="input-clip-path-outside">
				<input placeholder="Name on card" className="input-clip-path-inside"></input>
			</div>
            <div className="two-comlumns-responsive">
				<div className="input-clip-path-outside">
					<input placeholder="Expiration Date (MM/YY)" className="input-clip-path-inside"></input>
				</div>
				<div className="input-clip-path-outside">
					<input placeholder="Security" className="input-clip-path-inside"></input>
				</div>
			</div>
            <p className="title">
				BILLING ADDRESS
			</p>
            <p className="sub-title">
                Select the address that matches your card or payment method.
            </p> 
            <div className="input-clip-path-outside"> 
				<div className={"input-clip-path-inside shipping-info " + (billMethod == 0 ? 'selected' : '')} onClick={() => setBillMethod(0)}> 
					Same as shipping address					
				</div>
			</div>
            <div className="input-clip-path-outside"> 
				<div className={"input-clip-path-inside shipping-info " + (billMethod == 1 ? 'selected' : '')} onClick={() => setBillMethod(1)}> 
					Use a different billing address
				</div>
			</div>
            { billMethod == 1 ? <>
                <ShippingInfo isCheckoutPayment={true}/>
                </>
                : ''
            }			
            <div className="information-submit">
                <Link to="/checkout"> <span> {`<  Return to Information`}</span></Link> 
                <div className="button-clip-path-outside">
                    <button onClick={onSubmit} className="button-clip-path-inside"> 
                        CONTINUE TO PAYMENT
                    </button> 
                </div>
            </div>
        
        </div>
    );
};

export default CheckoutPayment;
