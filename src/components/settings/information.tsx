import React, { useEffect, useState } from 'react';
import ApiManager from '../../services/ApiManager';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Close from '@material-ui/icons/Close';
import { Snackbar } from '@material-ui/core';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}


const Information = () => {
  const [premiumInformation, setPremiumInformation] = useState<any>()
  const [premiumFeatures, setPremiumFeatures] = useState<any>()
  const [featureValue, setFeatureValue] = useState<any>()
  const [priceValue, setPriceValue] = useState<any>()
  const [termsAndConditions, setTermsAndConditions] = useState<any>()

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState<'error' | 'info' | 'success' | 'warning'>();

  useEffect(() => {
    void getPremiumInformation();
    void getListPremiumFeatures();
  }, [])

  const getPremiumInformation = async () => {
    await ApiManager.GET_PREMIUM_INFORMATION().then((result: any) => {
      setPremiumInformation(result)
    })
  };

  const getListPremiumFeatures = async () => {
    await ApiManager.GET_LIST_PREMIUM_FEATURES().then((result: any) => {
      console.log('premiumFeatures', result);
      setPremiumFeatures(result)
    })
  };

  const savePremiumInformation = () => {
    const values = {
      price: priceValue,
      termsAndConditions: termsAndConditions
    }
    try {
      void ApiManager.UPDATE_PREMIUM_INFORMATION(values).then(() => {
        setMessageSnackbar(`Update!`);
        setSeverity('success');
        setOpenSnackbar(true);
        void getListPremiumFeatures();
      })
    } catch (error) {
      setMessageSnackbar('Fail Update!');
      setSeverity('warning');
      setOpenSnackbar(true);
    }
  }

  const createPremiumFeature = () => {
    void ApiManager.CREATE_PREMIUM_FEATURES(featureValue).then(() => {
      void getListPremiumFeatures();
    })
  }

  const deletePremiumFeature = (id: any ) => {
    try {
        void ApiManager.DELETE_PREMIUM_FEATURES(id).then(() => {
          setMessageSnackbar(`Feature deleted!`);
          setSeverity('success');
          setOpenSnackbar(true);
          void getListPremiumFeatures();
        })
    } catch (error) {
      setMessageSnackbar('Failed to delete feature');
      setSeverity('warning');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="profile-box-form">
      <div className="form-info-block">
        <div>
          <p className="form-login-title green px20">Premium Information</p>
          <p className="form-login-subtitle gray px12 mb-6px">Information for Free Users</p>
        </div>
      </div>
      <div className="box-2-box">
        <div className="profile-block-box">
          <div>
            <div className='profile-block-box mb-16px'>
              <div>
                <label className='form-profile-label'>Add Premium Features</label>
                <input className='form-profile-input'
                       type='text'
                       name='add_service'
                       id='add_service'
                       value={featureValue}
                       onChange={(e: any) => setFeatureValue(e.target.value)}
                       placeholder='Premium Features Name Here' />
              </div>
              <p className='row-content'>
                <button className='button-green' onClick={createPremiumFeature}>Add Premium Features</button>
              </p>
            </div>
            {premiumFeatures && premiumFeatures.map((item: any, key: any) => {
              return (
                <p key={key}>
                  <input className="form-profile-input form-profile-input-feature" type="text" disabled
                         value={item.name} />
                  <Close className='form-login-input-close' onClick={() => deletePremiumFeature(item.id)} />
                </p>
              )}
            )}
          </div>
        </div>
        <div className="profile-block-box">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Price</label>
            </p>
            <p>
              {premiumInformation &&
                <input className="form-profile-input" type="text" name="" id=""
                                            value={priceValue ? priceValue : premiumInformation.price} onChange={(e: any) => setPriceValue(e.target.value)} />
              }
            </p>
          </div>
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Terms and Conditions</label>
            </p>
            <p>
              {premiumInformation && <input className="form-profile-input" type="text" name="" id=""
                                            value={termsAndConditions ? termsAndConditions : premiumInformation.termsAndConditions} onChange={(e: any) => setTermsAndConditions(e.target.value)}  />
              }
            </p>
          </div>
          <p className="row-content">
            <button className="button-green" onClick={savePremiumInformation}>Save</button>
          </p>
        </div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}
          // @ts-ignore
               severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Information;

