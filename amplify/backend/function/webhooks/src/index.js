const Stripe = require('stripe')
const stripe = new Stripe('sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I' || '', {
    apiVersion: '2020-03-02',
});

const paymentSucceeded = async (dataObject) => {
    const customerID = dataObject['customer'];
    if (!customerID) {
        throw Error(`No customer with ID "${customerID}"`);
    }
    const customerEmail = dataObject['customer_email'];
    const customerName = dataObject['customer_name'];
    const linkToInvoice = dataObject['hosted_invoice_url'] ;
    // Use the above to send confirmation email with a link to invoice,
    // thus enabling the paid functionality.
};

const paymentFailed = async (dataObject) => {
    // ...This is more or less identical with the paymentSucceeded function above.
    // Send an email notifying about the failed payment.
};

const subscriptionDeleted = async (dataObject) => {
    // ...This is more or less identical with the paymentSucceeded function above.
    // Send an email confirming that there subscription has now ended.
};

const handlerMapping = {
    'invoice.payment_succeeded': paymentSucceeded,
    'invoice.payment_failed': paymentFailed,
    'customer.subscription.deleted': subscriptionDeleted,
};


exports.handler = async (
    event,
    context,
    callback,
) => {
    if (!event.body) {
        callback(Error('Invalid body'));
        return;
    }
    try {
        // We validate that the event is coming from an
        // authentic Stripe origin
        const webhookEvent = stripe.webhooks.constructEvent(
            event.body,
            event.headers['Stripe-Signature'],
            process.env.STRIPE_WEBHOOK_SECRET,
        );
        // Pull out the data object (customer, invoice, etc...)
        const dataObject = webhookEvent.data.object;
        // Get the corrosponding handler from the handlerMapping above
        const handler = handlerMapping[webhookEvent.type];
        if (!handler) {
            callback(null, {
                statusCode: 400,
                body: 'Unexpected event type',
            });
            return;
        }
        await handler(dataObject);
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