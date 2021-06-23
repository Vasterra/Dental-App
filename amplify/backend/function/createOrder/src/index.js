const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const ORDER_TABLE = "Order-yxnzcbxm75bq7cpnbmcme24v6y-dev";
const ORDER_TYPE = "Order";
const PLAN_ORDER_TABLE = "PlanOrder-yxnzcbxm75bq7cpnbmcme24v6y-dev";
const PLAN_ORDER_TYPE = "PlanOrder";

const createOrder = async (payload) => {
    const { order_id, username, email, total } = payload;
    var params = {
        TableName: ORDER_TABLE,
        Item: {
            id: order_id,
            __typename: ORDER_TYPE,
            customer: email,
            dentist: username,
            total: total,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }
    };
    console.log(params);
    await documentClient.put(params).promise();
};

const createPlanOrder = async (payload) => {
    let planOrders = [];
    for (let i = 0; i < payload.cart.length; i++) {
        const cartItem = payload.cart[i];
        planOrders.push({
            PutRequest: {
                Item: {
                    id: uuidv4(),
                    __typename: PLAN_ORDER_TYPE,
                    plan_id: cartItem.id,
                    order_id: payload.order_id,
                    customer: payload.email,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            }
        });
    }
    let params = {
        RequestItems: {}
    };
    params["RequestItems"][PLAN_ORDER_TABLE] = planOrders;
    console.log(params);
    await documentClient.batchWrite(params).promise();
};

/*
 * Get order details from processPayment lambda
 * Create an order
 * Link subscriptions to the order - Users can see the past orders and admins can view orders by user
 * Email the invoice (Will be added later)
 */
exports.handler = async (event) => {
    try {
        let payload = event.prev.result;
        payload.order_id = uuidv4();

        // create a new order
        await createOrder(payload);

        // links subscriptions with the order
        await createPlanOrder(payload);

        // Note - You may add another function to email the invoice to the user

        return "SUCCESS";
    } catch (err) {
        console.log(err);
        return new Error(err);
    }
};