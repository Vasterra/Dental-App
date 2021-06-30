import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import StripeManager from "../../services/StripeManager";

type Props = {
  dentist: any,
}

const CheckoutFormStripe: React.FunctionComponent<Props> = ({dentist}) => {
  // Include these hooks:
  const stripe = useStripe();
  const elements = useElements();
  const [nameInput, setNameInput] = useState('');
  const [currentDentist, setCurrentDentist] = useState(dentist);

  const [retry, setRetry] = useState(typeof window !== "undefined" ? !!localStorage.getItem('invoice_retry') : '');

  const handleSubmitPayment = async () => {
    if (!stripe || !elements) {
      return;
    }
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement) as any,
        billing_details: {
          name: nameInput
        },
      });
      if (error || !paymentMethod) {
        throw Error(error?.message || 'Something is not right...');
      }

      const customerID = await StripeManager.getStripeCustomerID(currentDentist);;
      if (!customerID) {
        throw Error('Could not identify customer');
      }
      console.log(customerID)
      const paymentID = paymentMethod.id;
      const subscription = await StripeManager.createSubscription(customerID, paymentID);
      if (subscription.latest_invoice.payment_intent.status === 'requires_payment_method') {
        setRetry(true);
        localStorage.setItem('latest_invoice_id', subscription.latest_invoice.id);
        throw Error('Your card was declined. Please try again or with another card');
      }
      if (subscription.status !== 'active') {
        throw Error('Could not process payment.');
      }
    } catch (error) {
      console.error(error);
      // Let the user know that something went wrong here...
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
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement) as any,
        billing_details: {
          name: nameInput
        },
      });
      if (error || !paymentMethod) {
        throw Error(error?.message || 'Something is not right...');
      }
      const { customerID } = dentist;
      if (!customerID) {
        throw Error('Could not identify customer');
      }
      const paymentID = paymentMethod.id;
      await StripeManager.retryInvoice(customerID, paymentID, invoiceID);
      localStorage.removeItem('latest_invoice_id');
    } catch (error) {
      console.error(error);
      // Let the user know that something went wrong here...
    }
  };

  const buttonAction = retry ? handleRetryPayment : handleSubmitPayment;
  return (
    <div>
      <input
        placeholder='Name on card'
        value={nameInput}
        onChange={(e) => setNameInput(e.currentTarget.value)}
      />
      <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement />
      <button onClick={buttonAction}></button>
    </div>
  );
};

export default CheckoutFormStripe;