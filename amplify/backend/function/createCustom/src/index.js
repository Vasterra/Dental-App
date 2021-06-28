import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I' || '', {
    apiVersion: '2020-03-02',
});

interface IBody {
    email: string;
    username: string;
}

export const handler = async (
    event: APIGatewayProxyEvent,
    context: any,
    callback: (err: Error | null, data: any) => void,
) => {
    if (!event.body) {
        callback(Error('Invalid body'));
        return;
    }
    const body = JSON.parse(event.body) as IBody;
    const { email, username } = body;
    if (!email || !username) {
        callback(null, {
            statusCode: 400,
            body: 'Missing email or username',
        });
        return;
    }
    try {
        // Create a new customer
        const customer = await stripe.customers.create({
            email,
            name: username,
        });
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(customer),
        });
    } catch (error) {
        callback(error);
    }
};