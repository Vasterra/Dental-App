import React, { useEffect, useState } from 'react';
import ApiManager from '../../services/ApiManager';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}


const Information = () => {

  const [premiumInformation, setPremiumInformation] = useState<any>()
  const [premiumFeatures, setPremiumFeatures] = useState<any>()
  const [featureValue, setFeatureValue] = useState<any>()

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

  const savePremiumFeatures = async() => {
    const values = {

    }
    await ApiManager.SET_PREMIUM_FEATURES(values)
  }

  const savePremiumInformation = async() => {
    const values = {

    }
    await ApiManager.SET_PREMIUM_INFORMATION(values)
  }

  const handleFeatures = (e: any, key: any) => {
    setFeatureValue(e[key])
    console.log(e);
    console.log(featureValue);
  }

  const createPremiumFeature = () => {
    void ApiManager.CREATE_PREMIUM_FEATURES(featureValue);
  }



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
            <div className='profile-block-box'>
              <div>
                <label className='form-profile-label'>Add Service</label>
                <input className='form-profile-input'
                       type='text'
                       name='add_service'
                       id='add_service'
                       value={featureValue}
                       onChange={(e: any) => setFeatureValue(e.target.value)}
                       placeholder='Service Name Here' />
              </div>
              <p className='row-content'>
                <button className='button-green' onClick={createPremiumFeature}>Add service</button>
              </p>
            </div>
            {premiumFeatures && premiumFeatures.map((item: any, key: any) => {
              return (
                <p key={key}>
                  <input className="form-profile-input" type="text" name="" id=""
                         value={item.name} onChange={(e) => handleFeatures(e.target.value, key)} placeholder="Verification Checkmark" />
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
                                            value={premiumInformation.price} placeholder="xx" />
              }
            </p>
          </div>
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Terms and Conditions</label>
            </p>
            <p>
              {premiumInformation && <input className="form-profile-input" type="text" name="" id=""
                                            value={premiumInformation.termsAndConditions} placeholder="Web Link" />
              }
            </p>
          </div>
          <p className="row-content">
            <button className="button-green" onClick={savePremiumInformation}>Save</button>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Information;

