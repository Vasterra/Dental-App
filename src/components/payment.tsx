import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import ApiManager from '../services/ApiManager';
import StripeManager from '../services/StripeManager';
import { updateDentist } from '../graphql/mutations';
import { API } from 'aws-amplify';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useRouter } from 'next/router';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

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

const SubmitButton = ({ processing, error, children, disabled }: any) => (
  <button
    className={`btn btn-success ${error ? "btn btn btn-danger" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
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

const CheckoutForm = ({dentist}: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<any>(null);
  const [couponField, showCouponField] = useState<boolean>(false);
  const [couponValue, setCouponValue] = useState<string>('');
  const [cuponStatus, setCuponStatus] = useState<'success' | 'error' | null>(null);
  const [checking, proccessCheckingCupon] = useState<boolean>(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: ""
  });
  const [premiumInformation, setPremiumInformation] = useState<any>()
  const initialValues = {
    id: dentist.id,
    firstName: dentist.firstName,
    lastName: dentist.lastName,
    bio: dentist.bio,
    email: dentist.email,
    website: dentist.website,
    city: dentist.city,
    street: dentist.street,
    postIndex: dentist.postIndex,
    phone: dentist.phone,
    qualifications: dentist.qualifications
  }
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if (document.referrer) {
      const url = new URL(document.referrer)
      localStorage.setItem('site', url.host);
    }
    void getPremiumInformation();
  }, [])

  const getPremiumInformation = async () => {
    await ApiManager.GET_PREMIUM_INFORMATION().then((result: any) => {
      setPremiumInformation(result)
    })
  }

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

    const payload: any = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as any,
      billing_details: billingDetails
    });


    if (error || !payload.paymentMethod) {
      console.log(error?.message || 'Something is not right...');
    }

    const customer = await StripeManager.getStripeCustomerID(dentist);

    if (!customer) {
      console.log('Could not identify customer');
    }
    const subscription: any = await StripeManager.createSubscription(customer.id, payload.paymentMethod.id, premiumInformation && Number(Math.ceil(premiumInformation.price)));

    if (!subscription.subscription.id) {
      setMessageSnackbar('Please try again later!');
      setSeverity('warning');
      setOpenSnackbar(true);
    }
    try {
      await API.graphql({
        query: updateDentist,
        variables: {
          input: {
            ...initialValues,
            customerID: customer.id,
            paymentMethodID: payload.paymentMethod,
            hasPaidPlan: true,
            subscriptionID: subscription.id,
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      })
      setMessageSnackbar('The payment was successful!');
      setSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push('/');
      }, 2000)
    } catch (err: any) {
      setMessageSnackbar('Please try again later!');
      setSeverity('warning');
      setOpenSnackbar(true);
    }

    setProcessing(false);

    // if (payload.error) {
    //   setError(payload.error as any);
    // } else {
    //   setPaymentMethod(payload.paymentMethod as any);
    // }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      name: ""
    });
  };

  // const handleSubmitPayment = async () => {
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   try {
  //     const {error, paymentMethod} = await stripe.createPaymentMethod({
  //       type: 'card',
  //       card: elements.getElement(CardNumberElement) as any,
  //       billing_details: {
  //         name: 'card'
  //       },
  //     });
  //     if (error || !paymentMethod) {
  //       throw Error(error?.message || 'Something is not right...');
  //     }
  //
  //     const customer = await StripeManager.getStripeCustomerID(dentist);
  //
  //     if (!customer) {
  //       throw Error('Could not identify customer');
  //     }
  //
  //     const paymentID = paymentMethod.id;
  //     const data = await StripeManager.createSubscription(customer, paymentID);
  //     console.log(data);
  //     // try {
  //     //   await API.graphql({
  //     //     query: updateDentist,
  //     //     variables: {
  //     //       input: {
  //     //         ...initialValues,
  //     //         customerID: customer,
  //     //         paymentMethodID,
  //     //         hasPaidPlan: true,
  //     //         subscriptionID: subscription.id,
  //     //       }
  //     //     },
  //     //     // @ts-ignore
  //     //     authMode: 'AWS_IAM'
  //     //   })
  //     // } catch (err: any) {
  //     // }
  //   } catch (error: any) {
  //     console.log(error.message)
  //   }
  // };

  const handleCheckCoupon = async () => {
    if (couponValue.length < 1) {
      return
    }
    proccessCheckingCupon(true)

    const coupons = await StripeManager.listCoupons();
    let calculationPrice = null;

    if (coupons !== undefined) {
      coupons.coupons.data.forEach((item: any) => {
        if (item.name === couponValue) {
          setTimeout(() => {
            calculationPrice = (premiumInformation.price * item.percent_off) / 100
            setPremiumInformation({
              price: calculationPrice.toFixed(2)
            })
            proccessCheckingCupon(false)
            setCuponStatus('success')
          })
        } else {
          setTimeout(() => {
            proccessCheckingCupon(false)
            setCuponStatus('error')
          })
        }
      })
    }
  }

  const handleCouponChange = (e: any)=>{
    setCouponValue(e.target.value)
    if(couponValue.length <= 1){
      setCuponStatus(null)
    }
  }
  const handleCouponKeydown = (e: any)=>{
    console.log(e.key)
    if (e.key === 'Enter') {
      handleCheckCoupon()
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      setCuponStatus(null)
    }
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethod.id}
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
      <div className="col-12 col-xl-6 mx-auto mt-3" style={{display: 'flex', justifyContent: 'space-between'}}>
        <SubmitButton processing={processing} error={error} disabled={(!stripe || checking)}>
          Pay ??{premiumInformation && premiumInformation.price}
        </SubmitButton>
        { couponField ?
          <div id="coupon_input_container">
            <input
              type="text"
              id="coupon_input"
              disabled={checking}
              value={couponValue}
              autoComplete="Coupon"
              placeholder={'Coupon'}
              onChange={handleCouponChange}
              onKeyDown={handleCouponKeydown}
            />
            <div style={{cursor: 'pointer'}}>
              {!cuponStatus && !checking && <CachedRoundedIcon fontSize={'medium'} color='inherit' style={{ margin: '0 5px 0 5px' }} onClick={handleCheckCoupon}/>}
              {!cuponStatus && checking && <CircularProgress disableShrink size={20} style={{ margin: '0 5px 0 5px' }}/>}
              {cuponStatus === 'success'  && <DoneAllRoundedIcon fontSize={'medium'} color='secondary' style={{ margin: '0 5px 0 5px' }}/>}
              {cuponStatus === 'error'  && <ErrorRoundedIcon fontSize={'medium'} color='error' style={{ margin: '0 5px 0 5px' }}/>}
            </div>
          </div>
          :
          <button
            className={`btn btn-success ${error ? "btn btn btn-danger" : ""}`}
            type="submit"
            onClick={()=>showCouponField(true)}
          >
            Add promotion code
          </button>
        }
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}
          // @ts-ignore
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

// Make sure to call `loadStripe` outside of a component???s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const App = ({dentist} : any) => {
  return (
    <div className="AppWrapper col-12 col-xl-8 mx-auto">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm dentist={dentist}/>
      </Elements>
    </div>
  );
};

export default App;
