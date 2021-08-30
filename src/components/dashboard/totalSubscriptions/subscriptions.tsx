import React from 'react';

type Props = {
  analytics: any
}

const Subscriptions: React.FunctionComponent<Props> = ({ analytics }) => {

  return (
    <div className='profile-block-box'>
      {analytics && <div className='double-blocks-5'>
        <div>
          <label className='form-profile-label'>Subscriptions</label>
          <input className='form-profile-input'
                 type='text'
                 disabled
                 name='totalSubscriptions'
                 id='totalSubscriptions'
                 value={analytics.totalSubscriptions}
          />
        </div>
        <div>
          <label className='form-profile-label'>Free Accounts</label>
          <input className='form-profile-input'
                 type='text'
                 disabled
                 name='totalFreeAccounts'
                 id='totalFreeAccounts'
                 value={analytics.totalFreeAccounts}
          />
        </div>
        <div>
          <label className='form-profile-label'>Subscriptions Closed </label>
          <input className='form-profile-input'
                 type='text'
                 disabled
                 name='totalSubscriptionsClosed'
                 id='totalSubscriptionsClosed'
                 value={analytics.totalSubscriptionsClosed}
          />
        </div>
        <div>
          <label className='form-profile-label'>Accounts Closed</label>
          <input className='form-profile-input'
                 type='text'
                 disabled
                 name='totalAccountsClosed'
                 id='totalAccountsClosed'
                 value={analytics.totalAccountsClosed}
          />
        </div>
        <div>
          <label className='form-profile-label'>Images Uploaded</label>
          <input className='form-profile-input'
                 type='text'
                 disabled
                 name='totalImagesUploaded'
                 id='totalImagesUploaded'
                 value={analytics.totalImagesUploaded}
          />
        </div>
      </div>}
    </div>
  );
};

export default Subscriptions;