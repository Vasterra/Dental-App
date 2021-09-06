import React from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import PaymentContent from 'src/components/payment';

const Payment = () => {
  return (
    <section className="container-vh">
      <Header />
      <div className="main-profile bg-white biling" style={{marginTop: '73px', minHeight: 'unset', maxHeight: 'unset'}}>
        <div className="profile-box-form">
            <div className="form-info-block">
                <div>
                  <p className="form-login-title green px20">Billing Information - Purchase subscription</p>
                  <p className="form-login-subtitle gray px12 mb-6px"></p>
                </div>
            </div>
            <div className="box-to-box " style={{marginTop: '-20px', marginBottom: '10%'}}>
              <PaymentContent/>
            </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default Payment;
