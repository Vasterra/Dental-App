import { NextApiRequest, NextApiResponse } from 'next';

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config';
import { formatAmountForStripe } from '../../../utils/stripe-helpers';

import Stripe from 'stripe';
// @ts-ignore
const stripe = new Stripe('sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { amount }: { amount: number } = req.body;
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.');
      }
      // Create PaymentIntent from body params.
      const params: Stripe.PaymentIntentCreateParams = {
        payment_method_types: ['card'],
        amount: formatAmountForStripe(amount, CURRENCY),
        currency: CURRENCY,
      };
      const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
        params
      );

      res.status(200).json(payment_intent);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
