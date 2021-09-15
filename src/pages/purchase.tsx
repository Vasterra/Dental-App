import React, { useEffect, useState } from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import PaymentContent from 'src/components/payment';
import { Auth } from 'aws-amplify';
import Router from 'next/router';
import ApiManager from '../services/ApiManager';

const Payment = () => {

  const [signedInUser, setSignedInUser]  = useState(false);
  const [userDb, setUserBd] = useState(false);

  useEffect(() => {
    void authListener()
  }, [])

  const authListener = async () => {
    try {
      const user_cognito = await Auth.currentAuthenticatedUser();
      const user_bd: any = await ApiManager.GET_DENTIST(user_cognito.attributes.sub);
      console.log(user_bd);
      setUserBd(user_bd.data.getDentist)
      setSignedInUser(true);
    } catch (e: any) {
      void await Router.push('/login');
    }
  };

  return signedInUser &&  (
    <section className="container-vh">
      <Header />
      <div className="main-profile bg-white biling" style={{marginTop: '73px', minHeight: 'unset', maxHeight: 'unset'}}>
        <div className="profile-box-form">
            <div className="form-info-block">
                <div>
                  <p className="form-login-title green px20">Purchase subscription</p>
                  <p className="form-login-subtitle gray px12 mb-6px"></p>
                </div>
            </div>
            <div className="box-to-box " style={{marginTop: '-20px', marginBottom: '10%'}}>
              <PaymentContent dentist={userDb}/>
            </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default Payment;
