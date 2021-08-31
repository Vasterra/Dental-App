import React from 'react';
// import ApiStripe from '../../services/ApiStripe';

const Information = () => {
  // useEffect(() => {
  //   void updatePlan()
  // })

  // const updatePlan = async () => {
  //   await ApiStripe.STRIPE_UPDATE_PLAN()
  // }

  return (
    <div className='profile-box-form'>
      <div className='form-info-block'>
        <div>
          <p className='form-login-title green px20'>Premium Information</p>
          <p className='form-login-subtitle gray px12 mb-6px'>Information for Free Users</p>
        </div>
      </div>
      <div className='box-2-box'>
        <div className='profile-block-box'>
          <div>
            <p className='form-profile-label'>
              <label className='form-profile-label'>Premium Features</label>
            </p>
            <p>
              <input className='form-profile-input' type='text' name='' id=''
                     value='1' placeholder='Verification Checkmark' />
            </p>
            <p>
              <input className='form-profile-input' type='text' name='' id=''
                     value='2' placeholder='Feature 2' />
            </p>
            <p>
              <input className='form-profile-input' type='text' name='' id=''
                     value='3' placeholder='Feature 3' />
            </p>
            <p>
              <input className='form-profile-input' type='text' name='' id=''
                     value='4' placeholder='Feature 4' />
            </p>
            <p>
              <input className='form-profile-input' type='text' name='' id=''
                     value='5' placeholder='Feature 5' />
            </p>
            <p className='add-plus'>
              <input className='form-profile-input ' type='text' name='' id=''
                     value='6' placeholder='' />
              <img className='plus' id='plus' src='../../../images/plus.svg' alt='' />
            </p>
          </div>
        </div>
        <div className='profile-block-box'>
          <div>
            <p className='form-profile-label'>
              <label className='form-profile-label'>Price</label>
            </p>
            <p>
              <input className='form-profile-input' type='text' name='' id=''
                     value='1' placeholder='xx' />
            </p>
          </div>
          <div>
            <p className='form-profile-label'>
              <label className='form-profile-label'>Terms and Conditions</label>
            </p>
            <p>
              <input className='form-profile-input' type='text' name='' id=''
                     value='1' placeholder='Web Link' />
            </p>
          </div>
          <p className='row-content'>
            <button className='button-green'>Save</button>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Information;

