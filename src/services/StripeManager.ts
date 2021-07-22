import {API, Auth} from "aws-amplify";
import { updateDentist } from "../graphql/mutations";
import {IStripeCustomer} from "../interfaces/IStripeCustomer";
import {IStripeSubscription} from "../interfaces/IStripeSubscription";

class StripeManager {
  public static async createCustomer(dentist: any) {
    try {
      // Retrieve email and username of the currently logged in user.
      // getUserFromDB() is *your* implemention of getting user info from the DB
      const {email, id}: any = dentist
      if (!email || !id) {
        throw Error('Email or username not found.');
      }
      const request = await fetch('https://7jgeup4ehe.execute-api.eu-west-1.amazonaws.com/dev/createCustomer', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          username: id,
        }),
      });
      const customer = (await request.json()) as IStripeCustomer;
      // Update your user in DB to store the customerID
      // updateUserInDB() is *your* implementation of updating a user in the DB
      return customer;
    } catch (error) {
      console.log('Failed to create customer');
      console.log(error);
      return null;
    }
  }

  public static async getStripeCustomerID(dentist: any) {
    // Retrieve the current customerID from the currently logged in user
    // getUserFromDB() is *your* implemention of getting user info from the DB
    const {customerID}: any = dentist;
    if (!customerID) {
      const customer = await this.createCustomer(dentist);
      console.log(customer)
      return customer;
    }
    return customerID;
  }

  public static async createSubscription(customerID: string, paymentMethodID: string) {
    const request = await fetch('https://xg92m8wtpa.execute-api.eu-west-1.amazonaws.com/dev/createSubscription', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerID,
        paymentMethodID,
      }),
    });
    const subscription = await request.json() as IStripeSubscription;
    if (subscription.status !== 'active') {
      throw Error('Unable to upgrade. Please try again');
    }
    if (subscription.latest_invoice.payment_intent.status === 'requires_payment_method') {
      throw Error('You credit card was declined. Please try again with another card.');
    }
    // Update your user in DB to store the subscriptionID and enable paid plan
    // updateUserInDB() is *your* implementation of updating a user in the DB
    return {
      // @ts-ignore
      paymentMethodID,
      hasPaidPlan: true,
      subscription,
    };
  }

  public static async handleSubscription(subscriptionID: string, end: boolean) {
    const request = await fetch('https://khyv8heflf.execute-api.eu-west-1.amazonaws.com/dev/handleSubscription', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subscriptionID,
        end,
      }),
    });
    return await request.json() as IStripeSubscription;
  }

  public static async retrieveSubscription(subscriptionID: string) {
    const request = await fetch('https://nblrn1i5a4.execute-api.eu-west-1.amazonaws.com/dev/retrieveSubscription', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subscriptionID,
      }),
    });
    return await request.json() as IStripeSubscription;
  }

  public static async getListSubscriptions(customerID: string) {
    const request = await fetch('https://evzvxzj1sf.execute-api.eu-west-1.amazonaws.com/dev/getListSubscriptions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerID,
      }),
    });

    return await request.json();
  }

  public static async updatePaymentMethod(customerID: string, paymentMethodID: string) {
    await fetch('https://vr4czqsb93.execute-api.eu-west-1.amazonaws.com/dev/updatePaymentMethod', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerID,
        paymentMethodID,
      }),
    });
    // Update your user in DB to store the new payment method
    // updateUserInDB() is *your* implementation of updating a user in the DB
    // @ts-ignore
    updateUserInDB({paymentMethodID});
  }

  public static async retreivePaymentInfo(paymentMethodID: string) {
    try {
      const request = await fetch(
        'https://dqanjkofi9.execute-api.eu-west-1.amazonaws.com/dev/retrievePaymentMethod',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            paymentMethodID,
          }),
        }
      );
      const result = await request.json();
      return {
        type: result.card.brand,
        digits: result.card.last4,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public static async retryInvoice(customerID: string, paymentMethodID: string, invoiceID: string) {
    const request = await fetch('https://69qwwhi060.execute-api.eu-west-1.amazonaws.com/dev/retryInvoice', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerID,
        paymentMethodID,
        invoiceID,
      }),
    });
    await request.json();
  }

}

export default StripeManager;

async function getUserFromDB() {
  const currentUser = await Auth.currentAuthenticatedUser();
  console.log(currentUser)
  return {
    email: currentUser.attributes.email,
    username: currentUser.attributes.sub
  };
}

function
// Update your user in DB to store the customerID
// updateUserInDB() is *your* implementation of updating a user in the DB
updateUserInDB(arg0: { customerID: string; }) {
  throw new Error("Function not implemented.");
}

