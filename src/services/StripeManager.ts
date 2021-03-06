import { API, Auth } from 'aws-amplify';
import { IStripeSubscription } from '../interfaces/IStripeSubscription';

class StripeManager {

  public static async createCustomer(dentist: any) {
    try {
      const {email, firstName}: any = dentist
      if (!email || !firstName) {
        throw Error('Email or username not found.');
      }
      const request = await fetch('https://ht9ocbnynh.execute-api.eu-west-1.amazonaws.com/dev/createCustomerStripe-dev', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          username: firstName,
        }),
      });
      return await request.json() as IStripeSubscription;
    } catch (error) {
      console.log(error);
    }
  }

  public static async getStripeCustomerID(dentist: any) {
    // Retrieve the current customerID from the currently logged in user
    // getUserFromDB() is *your* implemention of getting user info from the DB
    const {customerID}: any = dentist;
    if (!customerID) {
      const customer = await this.createCustomer(dentist);
      return customer;
    }
    return customerID;
  }

  public static async createSubscription(customerID: string, paymentMethodID: string, amount: string) {
    try {
      if (!customerID || !paymentMethodID) {
        return {
          messageError: 'customerID or paymentMethodID or price not found.'
        };
      }

      const apiName = 'createSubscriptionStripe'
      const apiEndpoint = '/createSubscriptionStripe'

      const myInit = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          customerID,
          paymentMethodID,
        }),
      };

      const subscription = await API.post(apiName, apiEndpoint, myInit);

      if (subscription.status !== 'active') {
        return {
          messageError: 'Unable to upgrade. Please try again'
        };
      }
      if (subscription.status === 'requires_payment_method') {
        return {
          messageError: 'You credit card was declined. Please try again with another card.'
        };
      }

      return {
        paymentMethodID,
        hasPaidPlan: true,
        subscription,
      };
    } catch (error) {
      console.log(error);
    }
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

  public static async listCoupons() {
      try {
        const request: any = await fetch('https://ner441b3c3.execute-api.eu-west-1.amazonaws.com/dev/getListCouponsStripe-dev ', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
        });
        return await request.json();
      } catch (error) {
        console.log(error);
      }
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
    } catch (error: any) {
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

