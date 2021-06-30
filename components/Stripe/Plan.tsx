import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {withRouter} from "next/router";
import React, {Component, useEffect, useState} from "react";
import {IStripeSubscription} from "../../interfaces/IStripeSubscription";
import StripeManager from "../../services/StripeManager";

const stripePromise = loadStripe('pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd' || '');

type Props = {
  dentist: any,
}

class Plan extends React.Component<Props> {

  state: any = {
    cardInformation: {
      type: '',
      digits: '',
    },
    subscription: {}
  }

  async componentDidMount() {
    await this.fetchCardInformation();
    await this.fetchSubscription();
  }

  async fetchCardInformation() {
    try {
      const info = await StripeManager.retreivePaymentInfo(this.props.dentist.paymentMethodID);
      if (info) {
        this.setState({cardInformation: info});
      }
    } catch (error) {
      // Let the user know that something went wrong here...
    }
  };

  async fetchSubscription() {
    try {
      const sub = await StripeManager.retrieveSubscription(this.props.dentist.subscriptionID);
      // const sub = await StripeManager.retrieveSubscription(dentist.subscriptionID);
      if (sub) {
        this.setState({subscription: sub});
      }
    } catch (error) {
      // Let the user know that something went wrong here...
    }
  };

  async handleCancelSubscription(end: any) {
    try {
      const subscription = await StripeManager.handleSubscription(this.props.dentist.subscriptionID, end);
      this.setState({subscription});
    } catch (error) {
      // Let the user know that something went wrong here...
    }
  };

  render() {
    const expirationDate = new Date(this.state.subscription.current_period_end * 1000).toDateString();
    const subscriptionWillEnd = this.state.subscription.cancel_at_period_end;

    return (
      <div>
        <div>The plan will expire on: {expirationDate}</div>
        <div>Card: {this.state.cardInformation.type}</div>
        <div>**** **** **** {this.state.cardInformation.digits}</div>
        <Elements stripe={stripePromise}>
          <UpdateForm dentist={this.props.dentist} typeCard={this.state.cardInformation.type}/>
        </Elements>
        {/*<button onClick={this.handleCancelSubscription(!subscriptionWillEnd)}>*/}
        {/*  {subscriptionWillEnd ? 'Continue' : 'Cancel'}*/}
        {/*</button>*/}
      </div>
    );
  }

};
const UpdateForm = (dentist, typeCard) => {
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
          name: typeCard,
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