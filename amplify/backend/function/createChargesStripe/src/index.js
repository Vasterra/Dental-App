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
  const { price, currency, token } = body;

  if (!price || !currency || !token) {
    callback(null, {
      statusCode: 400,
      body: 'Missing payment method'
    });
    return;
  }
  try {
    const charges = await stripe.charges.create({
      amount: price,
      currency,
      source: token
    });
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({
        id: charges.id
      })
    });
  } catch (error) {
    callback({ id: null });
  }
};
