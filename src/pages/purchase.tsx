import React, { useEffect, useState } from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import PaymentContent from 'src/components/payment';
import { Auth, withSSRContext } from 'aws-amplify';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { getDentist } from '../graphql/queries';

const Payment = ({dentist}: any) => {

  const [signedInUser, setSignedInUser] = useState(false);

  useEffect(() => {
    void authListener()
  }, [])

  const authListener = async () => {
    try {
      await Auth.currentAuthenticatedUser();
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
              <PaymentContent dentist={dentist}/>
            </div>
        </div>
      </div>
      <Footer/>
    </section>
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
