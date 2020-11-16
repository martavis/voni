import { UpdateAddressInput } from 'types/vendure';


export const formatPrice = (intPrice: number): string => {
    const priceStr = intPrice.toString();
    const cents = priceStr.substr(-2);
    return priceStr.substring(0, priceStr.lastIndexOf(cents)) + `.${cents}`;
};

export const validateEmail = (email : string) : boolean => { 
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) { 
        return false;
    } else { 
        return true;
    }
};

export const addressValidation = (input: UpdateAddressInput) : boolean => { 
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body : 
            JSON.stringify( {
            "AccessRequest": {
                "AccessLicenseNumber": "CD8C99ABC34D8CFD",
                "UserId": "auraticd",
                "Password": "d82u@K0re8LsmPkm!mQ3l2"
            },
            "AddressValidationRequest": { 
                "Request": {
                    "TransactionReference": {
                        "CustomerContext": "Your Customer Context",
                    },
                    "RequestAction": "AV"
                    },
                "Address": {
                    "City": "ALPHARETTA",
                    "StateProvinceCode": "GA",
                    "PostalCode": "30005"
                }
            }
        } )
    };
    fetch('https://onlinetools.ups.com/rest/AV/', requestOptions)            
        .then(response => {
            console.log(response);
        });
    return false;
}