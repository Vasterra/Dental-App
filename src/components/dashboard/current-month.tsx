import React, {useEffect, useState } from "react";
import ApiManager from "src/services/ApiManager";
import Error from "next/error"

type Props = {
  analytics: any
}

const CurrentMonth: React.FunctionComponent<Props>= ({analytics}) => {

    return (
      <div className="profile-box-form">
        { analytics && <div>
          <p className="form-login-title green px20">Current Month</p>
          <p className="form-login-subtitle gray px12 mb-6px">Summary</p>
          <div className="profile-block-box">
            <div className="double-blocks-5">
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">New Subscriptions</label>
                </p>
                <p>
                  <input className="form-profile-input"
                         type="text"
                         name="monthNewSubscriptions"
                         id="monthNewSubscriptions"
                         value={analytics.monthNewSubscriptions}
                  />
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">New Free Accounts</label>
                </p>
                <p>
                  <input className="form-profile-input"
                         type="text"
                         name="monthNewFreeAccounts"
                         id="monthNewFreeAccounts"
                         value={analytics.monthNewFreeAccounts}
                  />
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Subscriptions Closed </label>
                </p>
                <p>
                  <input className="form-profile-input"
                         type="text"
                         name="monthSubscriptionsClosed"
                         id="monthSubscriptionsClosed"
                         value={analytics.monthSubscriptionsClosed}
                  />
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Accounts Closed</label>
                </p>
                <p>
                  <input className="form-profile-input"
                         type="text"
                         name="monthAccountsClosed"
                         id="monthAccountsClosed"
                         value={analytics.monthAccountsClosed}
                  />
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Images Uploaded</label>
                </p>
                <p>
                  <input className="form-profile-input"
                         type="text"
                         name="monthImagesUploaded"
                         id="monthImagesUploaded"
                         value={analytics.monthImagesUploaded}
                  />
                </p>
              </div>
            </div>
          </div>
        </div> }
      </div>
    );
};

export default CurrentMonth;

