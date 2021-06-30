import {loadStripe} from '@stripe/stripe-js';
import CheckoutFormStripe from './CheckoutForm';

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import React from 'react';

type Props = {
  dentist: any,
}

const stripePromise = loadStripe('pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd' || '');
const Upgrade: React.FunctionComponent<Props> = ({dentist}) => {
  return (
    <div>
      <h1>Upgrade now</h1>
      <Elements stripe={stripePromise}>
        <CheckoutFormStripe dentist={dentist}/>
      </Elements>
    </div>
  );
};
const CheckoutForm = () => {
  // Not implemented yet
};
export default Upgrade;