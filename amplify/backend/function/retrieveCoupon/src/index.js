const stripe = require('stripe')('sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I');

exports.handler = async (event, context, callback) => {

  if (!event) {
    callback(Error('Invalid body'));
    return;
  }

  const stripeCoupon = event.coupon;

  if (!stripeCoupon) {
    callback(null, {
      statusCode: 400,
      body: 'Missing coupon'
    });
    return;
  }

  try {
    let coupon = await stripe.coupons.retrieve(stripeCoupon);
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({
        id: coupon.id
      })
    });
  } catch (error) {
    throw error
  }
};