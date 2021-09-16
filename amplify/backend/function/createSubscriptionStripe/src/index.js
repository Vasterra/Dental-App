const Stripe = require('stripe');
const stripe = new Stripe(
  'sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I' ||
  '',
  {
    apiVersion: '2020-03-02'
  }
);

exports.handler = async (event, context, callback) => {
  if (!event.body) {
    callback(Error('Invalid body'));
    return;
  }
  const body = JSON.parse(event.body);
  const { paymentMethodID, customerID, price } = body;

  if (!paymentMethodID || !customerID || !price) {
    callback(null, {
      statusCode: 400,
      body: 'Missing payment method or customer'
    });
    return;
  }
  try {
    // Attach the payment method
    await stripe.paymentMethods.attach(paymentMethodID, {
      customer: customerID
    });
    // Set the payment method as the 'default' for this customer
    await stripe.customers.update(customerID, {
      invoice_settings: {
        default_payment_method: paymentMethodID
      }
    });
    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerID,
      items: [
        {
          price: price
        }
      ],
    });
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify(subscription)
    });
  } catch (err) {
    console.log("error posting to appsync: ", err)
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    }
  }
};
