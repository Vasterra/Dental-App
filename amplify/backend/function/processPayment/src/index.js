/* Amplify Params - DO NOT EDIT
	AUTH_DENTALAWSDF4894E3_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const USER_POOL_ID = "eu-west-1_UVUwtyQAY";
const stripe = require("stripe")("sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I");

const getUserEmail = async (event) => {
    const params = {
        UserPoolId: USER_POOL_ID,
        Username: event.identity.claims.username
    };
    const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
    const { Value: email } = user.UserAttributes.find((attr) => {
        if (attr.Name === "email") {
            return attr.Value;
        }
    });
    return email;
};

/*
 * Get the total price of the order
 * Charge the customer
 */
exports.handler = async (event) => {
    try {
        const { id, cart, total, address, token } = event.arguments.input;
        const { username } = event.identity.claims;
        const email = await getUserEmail(event);

        await stripe.charges.create({
            amount: total * 100,
            currency: "usd",
            source: token,
            description: `Order ${new Date()} by ${email}`
        });
        return { id, cart, total, address, username, email };
    } catch (err) {
        throw new Error(err);
    }
};