export const formatPrice = (priceStr: string | number): string => {
    if (typeof priceStr == 'number') {
        return 'NNN';
    }
    
    let decimalIndex = priceStr.indexOf('.');
    let cents = priceStr.substr(decimalIndex + 1);
    cents = cents.length === 1 ? `${cents}0` : cents; // because trailing '0' is deleted in the api
    return priceStr.substring(0, decimalIndex) + `.${cents}`;
};

export const calculateQuantityTotal = (price: string | number, quantity: number): string => {
    if (typeof price == 'string') {
        price = parseFloat(price);
    }

    return (price * quantity).toFixed(2).toString();
};

export const validateEmail = (email: string): boolean => {
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
        return false;
    } else {
        return true;
    }
};