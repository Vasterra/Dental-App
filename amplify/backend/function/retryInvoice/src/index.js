const Stripe = require('stripe')
const stripe = new Stripe('sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I' || '', {
    apiVersion: '2020-03-02',
});

exports.handler = async (
    event,
    context,
    callback,
) => {
    if (!event.body) {
        callback(Error('Invalid body'));
        return;
    }
    const body = JSON.parse(event.body);
    const { paymentMethodID, customerID } = body;
    if (!paymentMethodID || !customerID) {
        callback(null, {
            statusCode: 400,
            body: 'Invalid payment method or customer ID',
        });
        return;
    }
    try {
        // Attach the new payment method
        await stripe.paymentMethods.attach(paymentMethodID, {
            customer: customerID,
        });
        // Set the new payment method as default
        await stripe.customers.update(customerID, {
            invoice_settings: {
                default_payment_method: paymentMethodID,
            },
        });
        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
        });
    } catch (error) {
        callback(error);
    }
};