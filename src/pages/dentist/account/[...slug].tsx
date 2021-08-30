import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Auth, withSSRContext } from 'aws-amplify';
import { WrapperFlex } from '../../../styles/Main.module';
import Layout from 'src/components/Layout';
import AccountInformation from 'src/components/Dentist/Account/AccountInformation';
import ResetPassword from 'src/components/Dentist/Account/ResetPassword';
import MySubscription from 'src/components/Dentist/Account/MySubscription';
import BillingInformation from 'src/components/Dentist/Account/BillingInformation';
import UpgradeToPremium from 'src/components/Dentist/Account/UpgradeToPremium ';
import ApiManager from 'src/services/ApiManager';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { getDentist } from 'src/graphql/queries';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Account = ({ dentist }: any) => {
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
        <div className='main-profile bg-white '>
          <div className='profile-box-form'>
            <div className='form-info-block'>
              <div>
                <p className='form-login-title green px20'>Account Information</p>
                <p className='form-login-subtitle gray px12 mb-6px'>Login Details</p>
              </div>
            </div>
            <div className='box-2-box'>
              {currentDentist &&
              <AccountInformation currentDentist={currentDentist} />}
              {currentDentist &&
              <ResetPassword setMessageSnackbar={setMessageSnackbar}
                             setOpenSnackbar={setOpenSnackbar}
                             setSeverity={setSeverity}
              />}
            </div>
          </div>
          <div className='profile-box-form'>
            <div className='form-info-block'>
              <div>
                <p className='form-login-title green px20'>Upgrade to Premium</p>
                <p className='form-login-subtitle gray px12 '>Paid Subscription</p>
              </div>
            </div>
            <div className='box-2-box'>
              {!currentDentist.hasPaidPlan &&
              <UpgradeToPremium currentDentist={currentDentist} />}
              {currentDentist.hasPaidPlan &&
              <MySubscription currentDentist={currentDentist} onCancelSubscription={onCancelSubscription} />}
              {currentDentist &&
              <BillingInformation currentDentist={currentDentist} />}
            </div>
          </div>
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

export default Account;


