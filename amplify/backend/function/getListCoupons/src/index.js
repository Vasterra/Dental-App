const stripe = require('stripe')('sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I');

exports.handler = async (event, context, callback) => {
    try {
        let coupons = await stripe.coupons.list();
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify({
                coupons
            })
        });
    } catch (error) {
        throw error
    }
};