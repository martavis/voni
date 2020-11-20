import { UpdateAddressInput } from 'types/vendure';

export const formatPrice = (intPrice: number): string => {
    const priceStr = intPrice.toString();
    const cents = priceStr.substr(-2);
    return priceStr.substring(0, priceStr.lastIndexOf(cents)) + `.${cents}`;
};

export const validateEmail = (email: string): boolean => {
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
        return false;
    } else {
        return true;
    }
};

export const addressValidationFunc = (input: UpdateAddressInput): boolean => {
    var addressValidation = require('./UPS/addressValidation');
    var validateAddress = new addressValidation('CD8C99ABC34D8CFD', 'auraticd', 'd82u@K0re8LsmPkm!mQ3l2');
    validateAddress.useSandbox(true);

    validateAddress.makeRequest({
        customerContext: "Customer Data",
        city: input.city,
        stateProvinceCode: input.province
    }, function (err: any, data: any) {
        if (err) {
            console.error(err);
        }
        if (data) {
            //Enjoy playing the data :)
            console.log(data);
        }
    });
    return true;
}

export const getShipment = (input: UpdateAddressInput): boolean => {
    return true;
}