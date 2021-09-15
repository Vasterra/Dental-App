import React, {useState} from "react";
import {Formik} from "formik";
import {API} from "aws-amplify";
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";
import StripeManager from "src/services/StripeManager";
import {updateDentist} from "src//graphql/mutations";

type Props = {
  currentDentist: any
}

const BillingInformation: React.FunctionComponent<Props> = ({currentDentist}) => {

  // Include these hooks:
  const stripe = useStripe();
  const elements = useElements();
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState('');

  const [retry, setRetry] = useState(typeof window !== "undefined" ? !!localStorage.getItem('invoice_retry') : null);

  const initialValues = {
    id: currentDentist.id,
    firstName: currentDentist.firstName,
    lastName: currentDentist.lastName,
    bio: currentDentist.bio,
    email: currentDentist.email,
    website: currentDentist.website,
    city: currentDentist.city,
    street: currentDentist.street,
    postIndex: currentDentist.postIndex,
    phone: currentDentist.phone,
    qualifications: currentDentist.qualifications
  }

  const handleSubmitPayment = async () => {
    if (!stripe || !elements) {
      return;
    }
    try {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement) as any,
        billing_details: {
          name: 'card'
        },
      });
      if (error || !paymentMethod) {
        throw Error(error?.message || 'Something is not right...');
      }

      const customer = await StripeManager.getStripeCustomerID(currentDentist);

      if (!customer) {
        throw Error('Could not identify customer');
      }

      const paymentID = paymentMethod.id;
      const {subscription, hasPaidPlan, paymentMethodID}: any = await StripeManager.createSubscription(customer, paymentID);
      try {
        await API.graphql({
          query: updateDentist,
          variables: {
            input: {
              ...initialValues,
              customerID: customer,
              paymentMethodID,
              hasPaidPlan: true,
              subscriptionID: subscription.id,
            }
          },
          // @ts-ignore
          authMode: 'AWS_IAM'
        })
      } catch (err: any) {
      }
      if (subscription.latest_invoice.payment_intent.status === 'requires_payment_method') {
        setRetry(true);
        localStorage.setItem('latest_invoice_id', subscription.latest_invoice.id);
        throw Error('Your card was declined. Please try again or with another card');
      }
      if (subscription.status !== 'active') {
        throw Error('Could not process payment.');
      }
      setError('')
    } catch (error: any) {
      setError(error.message)
    }
  };

  const handleRetryPayment = async () => {
    if (!stripe || !elements) {
      return;
    }
    const invoiceID = localStorage.getItem('latest_invoice_id');
    try {
      if (!invoiceID) {
        throw Error('Could not process payment. Please refresh and try again.');
      }
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement) as any,
        billing_details: {
          name: 'card'
        },
      });
      if (error || !paymentMethod) {
        throw Error(error?.message || 'Something is not right...');
      }
      const {customerID} = currentDentist;
      if (!customerID) {
        throw Error('Could not identify customer');
      }
      const paymentID = paymentMethod.id;
      await StripeManager.retryInvoice(customerID, paymentID, invoiceID);
      localStorage.removeItem('latest_invoice_id');
    } catch (error: any) {
      setError(error.message)
      // Let the user know that something went wrong here...
    }
  };

  const buttonAction = retry ? handleRetryPayment : handleSubmitPayment;

  return (
    <div className="profile-block-box">
      <div>
        <p className="form-profile-label">
          <label className="form-profile-label">Billing Information</label>
        </p>
        <p className="row-content">
          <span className="input-span">Card No.</span>
          <CardNumberElement className="form-profile-input"/>
          {/*<input className="form-profile-input"*/}
          {/*       type="text"*/}
          {/*       name="card_number"*/}
          {/*       id="card_number"*/}
          {/*       value=""*/}
          {/*       placeholder="XXXXXXXXXXXXX"*/}
          {/*/>*/}
        </p>
        <p className="row-content">
          <span className="input-span">Exp.</span>
          <CardExpiryElement className="form-profile-input"/>
          {/*<input className="form-profile-input"*/}
          {/*       type="date"*/}
          {/*       name="data"*/}
          {/*       id="data"*/}
          {/*       value="01/01/2021"*/}
          {/*       placeholder="01/01/2021"*/}
          {/*/>*/}
        </p>
        <p className="row-content">
          <span className="input-span">CCV</span>
          <CardCvcElement className="form-profile-input"/>
        </p>
        <p className="row-content">
          <span className="input-span">Post Code</span>
          <input className="form-profile-input"
                 type="text"
                 name="post_code"
                 id="post_code"
                 value=""
                 placeholder="CB1 2AB"
          />
        </p>
      </div>
      <p className="row-content">
        <span className="input-span"></span>
        <button className="button-green" onClick={buttonAction}>Confirm Subscription</button>
      </p>
    </div>
  )
};

export default BillingInformation
