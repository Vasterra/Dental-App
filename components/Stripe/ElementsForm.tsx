import React, {useState} from 'react';
import PrintObject from './PrintObject';
import {fetchPostJSON} from '../../utils/api-helpers';
import * as config from '../../config';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#6772e5',
      color: '#6772e5',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#6772e5',
      },
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961',
    },
  },
};

const ElementsForm = () => {
  // @ts-ignore
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
    cardholderName: '',
  });
  const [payment, setPayment] = useState({status: 'initial'});
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const PaymentStatus = ({status}: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h2>Processing...</h2>;

      case 'requires_action':
        return <h2>Authenticating...</h2>;

      case 'succeeded':
        return <h2>Payment Succeeded 🥳</h2>;

      case 'error':
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: { preventDefault: () => void; currentTarget: { reportValidity: () => any; }; }) => {
    e.preventDefault();

    if (!e.currentTarget.reportValidity()) return;
    setPayment({status: 'processing'});

    const response = await fetchPostJSON('/api/payment_intents', {
      amount: input.customDonation,
    });
    setPayment(response);

    if (response.statusCode === 500) {
      setPayment({status: 'error'});
      setErrorMessage(response.message);
      return;
    }

    const cardElement = elements!.getElement(CardElement);

    const {error, paymentIntent} = await stripe!.confirmCardPayment(
      response.client_secret,
      {
        payment_method: {
          card: cardElement!
        }
      }
    );
    console.log(paymentIntent)
    if (error) {
      setPayment({status: 'error'});
      // @ts-ignore
      setErrorMessage(error.message);
    } else if (paymentIntent) {
      setPayment(paymentIntent);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="pay-card border">
          <p className="text-form">Update Payment Information</p>
          <div className="card-numbers">
            <div><span className="text-form1">Card Number</span>
              <div className="input1 text-form1">
                <CardElement
                  // @ts-ignore
                  options={CARD_OPTIONS}
                  // @ts-ignore
                  onChange={(e: { error: { message: any; }; }) => {
                    if (e.error) {
                      setPayment({status: 'error'});
                      setErrorMessage(
                        e.error.message
                      );
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="space-evenly">
            <button className="button-small input-background">Cancel</button>
            <button
              className="button-small"
              type="submit"
              disabled={
                !['initial', 'succeeded', 'error'].includes(payment.status) ||
                !stripe
              }>Confirm
            </button>
          </div>
        </div>
      </form>
      <PaymentStatus status={payment.status}/>
      <PrintObject content={payment}/>
      <style jsx>{`

        .container {
          margin: 0 auto;
          width: 99%;
          box-shadow: 0 0 10px #ccc;
          background: #E7E7E7;
        }

        .box {
          max-width: 100%;
        }

        .topmenu {
          height: 80px;
          width: 100%;
          background: #B1B1B1;
          border: 1px solid #707070;
        }

        .profile {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;

        }

        .leftmenu {
          width: 360px;
          max-width: 100%;
          background: #E7E7E7 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          opacity: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          align-self: flex-start;

        }

        .leftmenu a {
          text-align: center;
          font: normal normal normal 24px/32px Segoe UI;
          letter-spacing: 0px;
          color: #707070;
          opacity: 1;
          text-decoration: none;
          padding: 25px;
          border-bottom: 1px solid #707070;
          width: 100%;
        }

        .leftmenu a:hover {
          color: #FFFFFF;
          background: #B0B0B0 0% 0% no-repeat padding-box;

        }

        .main {
          width: 100%;
          background: #CCCCCC 0% 0% no-repeat padding-box;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .h1 {
          text-align: center;
          font: normal normal normal 36px/48px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
          margin-top: 0;
          padding-top: 0;
        }

        .stripe-big {
          margin: 0;
          padding: 0;
          width: 622px;
          max-width: 100%;
          height: 0px;
          border: 1px solid #D4D4D4;
        }

        .h2 {
          text-align: left;
          font: normal normal normal 24px/32px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
          margin-bottom: 0;

        }

        .h3 {
          text-align: left;
          font: normal normal normal 16px/21px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
        }

        .text-form1 {
          text-align: left;
          font: normal normal normal 11px/15px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
        }

        .text-form {
          margin: 0;
          padding: 0;
          text-align: left;
          font: normal normal normal 16px/21px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
        }

        .block1,
        .block2 {
          /* width: 650px; */
          max-width: 100%;
          min-width: 300px;
          height: 900px;
          max-height: 100%;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          /* border: 1px solid #707070; */
          margin: 60px 60px;
          padding: 0 40px;
        }

        .block1-form1 {
          background: #FFFFFF 0% 0% no-repeat padding-box;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
        }

        .block1-form2,
        .block2-form1 {
          background: #FFFFFF 0% 0% no-repeat padding-box;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .block2-form2 {
          margin-top: 98px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .block2-form3 {
          margin-top: 80px;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
        }

        .block1-form1 {
          /* border: 1px solid #707070; */
        }

        .column-center {
          border: 1px solid #707070;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          align-self: stretch;
          width: 48%;
          padding: 15px;
          margin: 15px 0;
          text-align: center;
        }

        .column-between {
          border: 1px solid #707070;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          align-self: stretch;
          width: 48%;
          padding: 15px;
          margin: 15px 0;
          text-align: center;
        }

        .padding {
          padding: 15px;
        }

        .input1 {
          margin: 0 0 15px 0;
          padding: 6px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          align-items: center;
        }

        .input2 {
          margin: 0 0 15px 0;
          width: 54px;
          max-width: 100%;
          padding: 6px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          align-items: center;
        }

        .big-input {
          height: 51px;
        }

        .super-input {
          margin-top: 0;
          margin-left: 10px;
          width: 328px;
          max-width: 100%;
          height: 28px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          padding-left: 10px;
          display: flex;
          align-items: center;
          text-align: left;
          font: normal normal normal 16px/21px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
        }

        .button-small {
          cursor: pointer;
          width: 55px;
          height: 19px;
          margin-right: 10px;
          /* background: #DBDBDB 0% 0% no-repeat padding-box; */
          border: 1px solid #707070;
          background: #fff;
          font: normal normal normal 9px/12px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
          border-radius: 10px;
          text-align: center;
        }

        .button-medium {
          width: 91px;
          height: 18px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          text-align: left;
          font: normal normal normal 7px/10px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-big {
          /* width: 205px; */
          margin: 30px 0;
          padding-left: 20px;
          padding-right: 20px;
          height: 35px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          border-radius: 20px;
          text-align: left;
          font: normal normal normal 14px/21px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stripe {
          width: 229px;
          height: 0px;
          border: 1px solid #D5D5D5;

        }

        .big-square {
          width: 204px;
          height: 49px;
          background: #E1E1E1 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          text-align: left;
          font: normal normal normal 13px/17px Segoe UI;
          letter-spacing: 0px;
          color: #A2A2A2;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .fa-user-circle {
          margin: 0;
          font-size: 60px;
          color: #858585;
        }

        .image {
          width: 190px;
        }

        .water {

          position: relative;
        }

        .watermark {
          position: absolute;
          bottom: 10px;
          right: 10px;
          text-align: left;
          font: normal normal normal 13px/17px Segoe UI;
          letter-spacing: 0px;
          color: #E4E4E4;
        }

        .space-between {
          display: flex;
          justify-content: space-between;
        }

        .delete {
          padding-right: 5px;
          font-weight: bold;
          font-size: 12px;
        }

        .delete-big {
          padding-right: 5px;
          font-weight: bold;
          font-size: 20px;
        }

        .border {
          border: 1px solid #707070;
        }

        .block50 {
          width: 48%;
        }

        .top-none {
          margin-top: 0;
          padding-top: 0;
        }

        .input-background {
          background: #D0D0D0;
        }

        .flex-start {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-start;
        }

        .flex-center {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
        }

        .button-gray {
          width: 133px;
          height: 34px;
          background: #DCDCDC 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          border-radius: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px;
        }

        .input-checkbox {
          margin-top: 0;
          padding-top: 0;
          width: 294px;
          height: 39px;
          background: #FFFFFF 0% 0% no-repeat padding-box;
          border: 1px solid #707070;
          text-align: left;
          font: normal normal normal 16px/21px Segoe UI;
          letter-spacing: 0px;
          color: #000000;
          display: flex;
          align-items: center;
          padding-left: 15px;
        }

        .fa-caret-down {
          font-size: 25px;
          padding-right: 10px;

        }

        #tab-active {
          color: #fff;
          background: #B0B0B0;
        }

        .block {
          max-width: 100%;
          min-width: 180px;
        }

        .pay-card {
          width: 400px;
          min-width: 200px;
          padding: 20px;
          margin: 20px 0;
        }

        .card-numbers {
          margin-top: 20px;
        }

        .margin-top {
          margin-top: 24px;
        }

        @media (max-width: 970px) {
          .block1 {
            margin: 10px;
          }
        }

        @media (max-width: 870px) {
          .block1 {
            margin: 0 auto;
            width: 100%;

          }

          .profile {
            flex-wrap: wrap;
          }

          .leftmenu {
            width: 100%;
            flex-direction: row;

          }

          .leftmenu a {
            border-left: 1px solid #707070;
          }

          .card-numbers {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 622px) {

          .block1-form1,
          .block1-form2,
          .block2-form1 {
            flex-wrap: wrap;
          }

          .block1,
          .block2 {
            height: auto;
            width: 100%;
            margin: 5px 0;
          }


          /* .column-center,
          .column-between,
          .block,
          .input1,
          .block50 {
              width: 100%;
          } */
          .image,
          .water {
            width: 90%;
          }

          .top-none {
            margin-top: 50px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          /* .input2 {
              width: 100%;
          } */
          /* .h2 {
              text-align: center;
          } */
          .block2-form2 {
            margin-top: 20px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }

          .block1,
          .block2 {
            width: 100%;
          }

          .column-center,
          .column-between,
          .block {
            width: 100%;
          }
        }

        @media (max-width: 584px) {
          .flex-start {
            flex-wrap: wrap;
            justify-content: space-evenly;
          }

          .leftmenu a {
            padding: 10px 5px;
            font-size: 16px;
          }

          .block1 {
            padding: 5px;
          }


          /* .button-big {
              font-size: 12px;
              padding-left: 3px;
              padding-right: 3px;
          } */
        }

        /* @media (max-width: 734px) {
  
            .block1,
            .block2 {
                width: 100%;
            }
  
            .column-center,
            .column-between,
            .block,
            .input1 {
                width: 100%;
            }
        } */

      `}</style>
    </>
  );
};

export default ElementsForm;