
// export const createContext = async () => {
//     // Set your secret key. Remember to switch to your live secret key in production!
//     // See your keys here: https://dashboard.stripe.com/account/apikeys
//     const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

//     const customer = await stripe.customers.create();

//     return customer; 
// };

export const createPaymentIntent = async () => {
    // Set your secret key. Remember to switch to your live secret key in production!
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

    const customer = await stripe.customers.create();

    const intent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        customer: customer.id,
    });

    return intent.client_secret; 
};