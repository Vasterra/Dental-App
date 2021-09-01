import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Auth, withSSRContext } from 'aws-amplify';
import { WrapperFlex } from '../../../styles/Main.module';
import Layout from 'src/components/Layout';
import ApiManager from 'src/services/ApiManager';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { getDentist } from 'src/graphql/queries';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import styled from 'styled-components'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const PaymentContent = ()=>{

  const StyledBox = styled.div`
    * {
    box-sizing: border-box;
    }

  input,
  button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border-style: none;
  }

  #root {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .AppWrapper {
    width: 500px;
    height: 400px;
    position: relative;
  }

  @keyframes fade {
    from {
      opacity: 0;
      transform: scale3D(0.95, 0.95, 0.95);
    }
    to {
      opacity: 1;
      transform: scale3D(1, 1, 1);
    }
  }

  .Form {
    animation: fade 200ms ease-out;
  }

  .FormGroup {
    margin: 0 15px 20px;
    padding: 0;
    border-style: none;
    background-color: #7795f8;
    will-change: opacity, transform;
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 #829fff;
    border-radius: 4px;
  }

  .FormRow {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin-left: 15px;
    border-top: 1px solid #819efc;
  }

  .FormRow:first-child {
    border-top: none;
  }

  .FormRowLabel {
    width: 15%;
    min-width: 70px;
    padding: 11px 0;
    color: #c4f0ff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @keyframes void-animation-out {
    0%,
    to {
      opacity: 1;
    }
  }
  .FormRowInput:-webkit-autofill {
    -webkit-text-fill-color: #fce883;
    /* Hack to hide the default webkit autofill */
    transition: background-color 100000000s;
    animation: 1ms void-animation-out;
  }

  .FormRowInput {
    font-size: 16px;
    width: 100%;
    padding: 11px 15px 11px 0;
    color: #fff;
    background-color: transparent;
    animation: 1ms void-animation-out;
  }

  .FormRowInput::placeholder {
    color: #87bbfd;
  }

  .StripeElement--webkit-autofill {
    background: transparent !important;
  }

  .StripeElement {
    width: 100%;
    padding: 11px 15px 11px 0;
  }

  .SubmitButton {
    display: block;
    font-size: 16px;
    width: calc(100% - 30px);
    height: 40px;
    margin: 40px 15px 0;
    background-color: #f6a4eb;
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 #ffb9f6;
    border-radius: 4px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 100ms ease-in-out;
    will-change: transform, background-color, box-shadow;
  }

  .SubmitButton:active {
    background-color: #d782d9;
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 #e298d8;
    transform: scale(0.99);
  }

  .SubmitButton.SubmitButton--error {
    transform: translateY(15px);
  }
  .SubmitButton.SubmitButton--error:active {
    transform: scale(0.99) translateY(15px);
  }

  .SubmitButton:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: #7795f8;
    box-shadow: none;
  }

  .ErrorMessage {
    color: #fff;
    position: absolute;
    display: flex;
    justify-content: center;
    padding: 0 15px;
    font-size: 13px;
    margin-top: 0px;
    width: 100%;
    transform: translateY(-15px);
    opacity: 0;
    animation: fade 150ms ease-out;
    animation-delay: 50ms;
    animation-fill-mode: forwards;
    will-change: opacity, transform;
  }

  .ErrorMessage svg {
    margin-right: 10px;
  }

  .Result {
    margin-top: 50px;
    text-align: center;
    animation: fade 200ms ease-out;
  }

  .ResultTitle {
    color: #fff;
    font-weight: 500;
    margin-bottom: 8px;
    font-size: 17px;
    text-align: center;
  }

  .ResultMessage {
    color: #9cdbff;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 25px;
    line-height: 1.6em;
    text-align: center;
  }

  .ResetButton {
    border: 0;
    cursor: pointer;
    background: transparent;
  }

  `
    const stripePromise = loadStripe(
      'pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd'
    );

  return (
    <StyledBox>
      <div className="AppWrapper">
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <CheckoutForm />
        </Elements>
      </div>
    </StyledBox>
  )
}

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

const CardField = ({ onChange }: any) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS as any} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}: any) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }: any) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }: any) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }: any) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<any>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
    coupon: ""
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card")!.focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as any,
      billing_details: billingDetails
    });

    setProcessing(false);

    if (payload.error) {
      setError(payload.error as any);
    } else {
      setPaymentMethod(payload.paymentMethod as any);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: "",
      coupon: ""
    });
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethod && paymentMethod!.id}
      </div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e: any) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e: any) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 555-0123"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e: any) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
         <Field
          label="Coupon"
          id="coupon"
          type="text"
          placeholder="coupon"
          required={false}
          autoComplete="coupon"
          value={billingDetails.coupon}
          onChange={(e: any) => {
            setBillingDetails({ ...billingDetails, coupon: e.target.value });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e: any) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay $25
      </SubmitButton>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
  ]
};

const Payment = ({ dentist }: any) => {
  const router = useRouter();

  const [currentDentist, setCurrentDentist] = useState(dentist);
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [signedInUser, setSignedInUser] = useState(false);
  const [route, setRoute]: any = useState();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if (router.query.slug !== undefined) {
      const { slug } = router.query;
      setRoute(slug[0]);
      void authListener();
      downloadAvatar(currentDentist);
    }
  }, [router]);

  const authListener = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
    } catch (e: any) {
      void await Router.push('/login');
    }
  };

  const downloadAvatar = (currentDentist: any) => {
    void ApiManager.downloadAvatar(currentDentist).then(signedFiles => {
      if (signedFiles !== undefined) {
        setCurrentAvatar(signedFiles);
      }
    });
  };

  const onCancelSubscription = async () => {
    await ApiManager.CREATE_CLOSED_SUBSCRIPTION(dentist.id);
    void ApiManager.UPDATE_DENTIST(
      {
        id: dentist.id,
        hasPaidPlan: false
      }
    ).then(() => {
      void ApiManager.getDentist(dentist.id).then(dent => {
        setCurrentDentist(dent);
      });
    });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (!currentDentist) return <WrapperFlex><CircularProgress size={120} /></WrapperFlex>;

  return (
    <>
      {currentDentist && signedInUser &&
      <Layout title='Account' active={'activeAccount'} currentAvatar={currentAvatar} currentDentist={currentDentist}>
       {/* ---------------------------------Change style this PaymentContent--------------------------------------  */}
        <div className='main-profile' style={{backgroundColor: 'blueviolet', alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
          <PaymentContent/>
        </div>
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar}
            // @ts-ignore
                 severity={severity}>
            {messageSnackbar}
          </Alert>
        </Snackbar>
      </Layout>}
    </>
  );
};

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { API } = withSSRContext(context);
  let dentistData;
  try {
    if (context.params.slug[0] === null) return;
    dentistData = await API.graphql({
      query: getDentist,
      variables: {
        id: context.params.slug[0]
      },
      authMode: 'AWS_IAM'
    });
  } catch (e: any) {
    console.log(e);
  }
  return {
    props: {
      dentist: dentistData ? dentistData.data.getDentist : null
    }
  };
};

export default Payment;


