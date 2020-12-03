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