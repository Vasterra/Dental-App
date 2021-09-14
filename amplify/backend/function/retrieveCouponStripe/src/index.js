const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const stripe = require('stripe')('sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I');

const server = awsServerlessExpress.createServer(app);

exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const coupon = await stripe.coupons.retrieve(
    'HO3Kid4d'
  );
  return awsServerlessExpress.proxy(server, event, context, coupon).promise;
};
