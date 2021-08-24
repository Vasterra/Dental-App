import React, {FC} from 'react';
import { CircularProgress } from '@material-ui/core';

type Props = {
  analytics: any
}

const CurrentMonth: FC<Props> = ({ analytics }) => {

  return (
    <div className='profile-box-form'>
      {!analytics && <div className='flex-wrapper'><CircularProgress size={120} /></div>}
      {analytics && <div>
        <p className='form-login-title green px20'>Current Month</p>
        <p className='form-login-subtitle gray px12 mb-6px'>Summary</p>
        <div className='profile-block-box'>
          <div className='double-blocks-5'>
            <div>
                <label className='form-profile-label'>New Subscriptions</label>
                <input className='form-profile-input'
                       type='text'
                       disabled
                       name='monthNewSubscriptions'
                       id='monthNewSubscriptions'
                       value={analytics.monthNewSubscriptions}
                />
            </div>
            <div>

                <label className='form-profile-label'>New Free Accounts</label>


                <input className='form-profile-input'
                       type='text'
                       disabled
                       name='monthNewFreeAccounts'
                       id='monthNewFreeAccounts'
                       value={analytics.monthNewFreeAccounts}
                />

            </div>
            <div>

                <label className='form-profile-label'>Subscriptions Closed </label>

                <input className='form-profile-input'
                       type='text'
                       disabled
                       name='monthSubscriptionsClosed'
                       id='monthSubscriptionsClosed'
                       value={analytics.monthSubscriptionsClosed}
                />

            </div>
            <div>

                <label className='form-profile-label'>Accounts Closed</label>

                <input className='form-profile-input'
                       type='text'
                       disabled
                       name='monthAccountsClosed'
                       id='monthAccountsClosed'
                       value={analytics.monthAccountsClosed}
                />

            </div>
            <div>

                <label className='form-profile-label'>Images Uploaded</label>

                <input className='form-profile-input'
                       type='text'
                       disabled
                       name='monthImagesUploaded'
                       id='monthImagesUploaded'
                       value={analytics.monthImagesUploaded}
                />

            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default CurrentMonth;

