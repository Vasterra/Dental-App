import React, { useState, useEffect } from "react";
import { loadStripe, StripeCardElement } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FacebookCircularProgress from './loader'

const SECRET_KEY_STRIPE_API = 'sk_test_51J15W0B5Yj7B7VjGDu05x2LI3AdPT5NeDvIFbAlfG37ZNreEAX8wHFY2f4ZzBrW9r9oeu0Qnpi3b2v4kWS99Z3o900Yu4TyZ4I'

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#444",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#444"
      },
      "::placeholder": {
        color: "#bbb"
      }
    },
    invalid: {
      iconColor: "#DC143C",
      color: "#DC143C"
    }
  }
};

const CardField = ({ onChange }: any) => (
  <div className="col-12 col-xl-6 mx-auto mt-3">
    <CardElement options={CARD_OPTIONS as any} onChange={onChange} />
  </div>
);
// const api = API.endpoint()
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
  <div className="col-12 col-xl-6 mt-3 mx-auto">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      className="form-control"
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

const SubmitButton = ({ processing, error, children, disabled, onCancel }: any) => (
  <div className="col-12 col-xl-6 mx-auto mt-3" style={{display: 'flex', justifyContent: 'space-between'}}>
    <KeyboardBackspaceIcon fontSize={'large'} color='primary' style={{cursor: 'pointer' }} onClick={(e: any)=>{e.preventDefault(), onCancel()}}/>
    {/* <button
      className={`btn btn-success ${error ? "btn btn btn-danger" : ""}`}
      type="submit"
      disabled={processing || disabled}
    >
      {!processing ? <FacebookCircularProgress/> : children}
    </button> */}
    <button 
      type='submit' 
      disabled={processing || disabled} 
      className='button-green'>
        {processing ? <FacebookCircularProgress /> : children}
    </button>
  </div>
);

const ErrorMessage = ({ children }: any) => (
  <div className="form-text col-12 col-xl-6 mx-auto" role="alert">
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
  <button type="button" className="btn btn-success" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CheckoutForm = ({ username, onSubmit, onCancel }: { username: string, onSubmit: ()=>{}, onCancel: ()=> void}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState<'warning' | 'error' | 'success' | 'info'>();

  useEffect(()=>{
    setMessageSnackbar('To combat fraud, we will verify your card by completing a transaction')
    setSeverity('warning')
    setOpenSnackbar(true)
  },[])

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<any>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [billingDetails, setBillingDetails] = useState({
    name: ""
  });

  const stripeTokenHandler = async(token: any)=>{
    const amount = 2000
    const currency = 'GBP'
    try {
      const response = await fetch('https://api.stripe.com/v1/charges', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer  ${SECRET_KEY_STRIPE_API}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: `amount=${amount}&currency=${currency}&source=${token.id}`
    });
      const chargeResponse = await response.json();
      console.log(chargeResponse)
      if(chargeResponse?.error?.message){
        setMessageSnackbar(chargeResponse.error.message)
        setSeverity('error')
        setOpenSnackbar(true)
        return null
      }
      return chargeResponse.id
    } catch (exp: any) {
      setMessageSnackbar(exp.message)
      setSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const stripeRefunder = async(chargeId: string)=>{
    try {
      const response = await fetch('https://api.stripe.com/v1/refunds', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer  ${SECRET_KEY_STRIPE_API}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: `charge=${chargeId}`
    });
      const res =  await response.json();
      if(res?.error?.message){
        setMessageSnackbar(res.error.message)
        setSeverity('error')
        setOpenSnackbar(true)
        return null
      }
      return res
    } catch (exp: any) {
      setMessageSnackbar(exp.message)
      setSeverity('error')
      setOpenSnackbar(true)
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
 
    if(username !== billingDetails.name){
      setMessageSnackbar(`The cardholder's name must match the user's name!`)
      setSeverity('error')
      setOpenSnackbar(true)
      return
    }
 
    if (!stripe || !elements) {
      setMessageSnackbar('Stripe Error...')
      setSeverity('error')
      setOpenSnackbar(true)
      return;
    }

    const cardElement = elements.getElement(CardElement) as StripeCardElement;
    // use stripe.createToken to get a unique token for the card
    const { error: cardError, token } = await stripe.createToken(cardElement);
 
    if (error) {
      elements!.getElement("card")!.focus();
      setMessageSnackbar('Stripe Error...')
      setSeverity('error')
      setOpenSnackbar(true)
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

    if (payload.error) {
      setError(payload.error as any);
    } else {
      setPaymentMethod(payload.paymentMethod as any);
      if (!cardError) {
        try {
          const chargeId = await stripeTokenHandler(token)
          const refund = await stripeRefunder(chargeId);
          if(refund){
            onSubmit()
          } 
        } catch (exp) {
          setMessageSnackbar('Stripe Card Error...')
          setSeverity('error')
          setOpenSnackbar(true)
        }finally{
          setProcessing(false);
        }
      }else{  
        setMessageSnackbar('Stripe Card Error...')
        setSeverity('error')
        setOpenSnackbar(true)
        setProcessing(false);
        return
      }
    }
  };

  return (
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
      </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e: any) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message as any}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe} onCancel={onCancel}>
        Submit
      </SubmitButton>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={5000} 
        onClose={()=>{setOpenSnackbar(false)}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={()=>{setOpenSnackbar(false)}}
          severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
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

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const pk_key = 'pk_test_51J15W0B5Yj7B7VjGcyWF6fMvy3UkvUUS5l6YJ3LQqLGFGZgK7UwNyVHLMMVi2HgDweAsAUxkhuukQBjWlTshTPmu00NmYIp1nd'
const stripePromise = loadStripe(pk_key);

const ValidateCard = ({ username, onSubmit, onCancel }: { username: string, onSubmit: ()=>{}, onCancel: ()=> void }) => {
  return (
    <div className="AppWrapper col-12 col-xl-8 mx-auto">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm username={username} onSubmit={onSubmit} onCancel={onCancel}/>
      </Elements>
    </div>
  );
};

export default ValidateCard;
