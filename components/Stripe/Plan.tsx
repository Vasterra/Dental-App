import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import React, {useEffect, useState} from "react";
import {IStripeSubscription} from "../../interfaces/IStripeSubscription";
import StripeManager from "../../services/StripeManager";

const stripePromise = loadStripe('pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd' || '');

type Props = {
  dentist: any,
}

const Plan: React.FunctionComponent<Props> = ({dentist}) => {

  const [cardInformation, setCardInformation] = useState<{
    type: string;
    digits: string;
  }>();
  const [subscription, setSubscription] = useState<IStripeSubscription>();
  const fetchCardInformation = async () => {
    try {
      const info = await StripeManager.retreivePaymentInfo(dentist.paymentMethodID);
      if (info) {
        setCardInformation(info);
      }
    } catch (error) {
      // Let the user know that something went wrong here...
    }
  };
  const fetchSubscription = async () => {
    try {
      console.log(dentist)
      const sub = await StripeManager.retrieveSubscription('prod_JkkduRtqS3SPgj');
      // const sub = await StripeManager.retrieveSubscription(dentist.subscriptionID);
      if (sub) {
        setSubscription(sub);
      }
    } catch (error) {
      // Let the user know that something went wrong here...
    }
  };
  useEffect(() => {
    fetchSubscription();
    fetchCardInformation();
  }, []);
  const handleCancelSubscription = (end: boolean) => async () => {

    //   try {
    //     const subscription = await StripeManager.handleSubscription(dentist.subscriptionID, end);
    //     setSubscription(subscription);
    //   } catch (error) {
    //     // Let the user know that something went wrong here...
    //   }
  };
  // console.log(dentist)
  // console.log(subscription)
  // const expirationDate = new Date(subscription.current_period_end * 1000).toDateString();
  // const subscriptionWillEnd = subscription.cancel_at_period_end;
  return (
    <div>
      {/*<div>The plan will expire on: {expirationDate}</div>*/}
      {/*<div>Card: {cardInformation.type}</div>*/}
      {/*<div>**** **** **** {cardInformation.digits}</div>*/}
      {/*<Elements stripe={stripePromise}>*/}
      {/*  <UpdateForm dentist={dentist}/>*/}
      {/*</Elements>*/}
      {/*<button onClick={handleCancelSubscription(!subscriptionWillEnd)}>*/}
      {/*  {subscriptionWillEnd ? 'Continue' : 'Cancel'}*/}
      {/*</button>*/}
    </div>
  );
};
const UpdateForm = (dentist) => {
  // Include these hooks:
  const stripe = useStripe();
  const elements = useElements();
  const [nameInput, setNameInput] = useState('');
  const handleUpdatePaymentMethod = async () => {
    if (!stripe || !elements) {
      return;
    }
    try {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement) as any,
        billing_details: {
          name: 'visa',
        },
      });
      if (error || !paymentMethod) {
        throw Error(error?.message || 'Something is not right...');
      }
      const customerID = await StripeManager.getStripeCustomerID(dentist);
      if (!customerID) {
        throw Error('Could not identify customer');
      }
      const paymentID = paymentMethod.id;
      await StripeManager.updatePaymentMethod(customerID, paymentID);
      // You may want to refetch the payment method after this...
    } catch (error) {
      // Toast.error(error.message);
    }
  };
  return (
    <div>
      <input
        placeholder='Name on card'
        value={nameInput}
        onChange={(e) => setNameInput(e.currentTarget.value)}
      />
      <CardNumberElement/>
      <CardExpiryElement/>
      <CardCvcElement/>
      <button onClick={handleUpdatePaymentMethod}></button>
    </div>
  );
};
export default Plan;