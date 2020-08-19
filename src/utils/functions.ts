export const formatPrice = (intPrice: number): string => {
    const priceStr = intPrice.toString();
    const cents = priceStr.substr(-2);
    return priceStr.substring(0, priceStr.lastIndexOf(cents)) + `.${cents}`;
};