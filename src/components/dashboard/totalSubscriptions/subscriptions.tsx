import React, { useEffect, useState } from "react";
import ApiManager from "src/services/ApiManager";
import Error from "next/error"

type Props = {
  analytics: any
}

const Subscriptions: React.FunctionComponent<Props>= ({analytics}) => {

  return (
    <div className="profile-block-box">
      {analytics && <div className="double-blocks-5">
        <div>
          <p className="form-profile-label">
            <label className="form-profile-label">Subscriptions</label>
          </p>
          <p>
            <input className="form-profile-input"
                   type="text"
                   name="totalSubscriptions"
                   id="totalSubscriptions"
                   value={analytics.totalSubscriptions}
            />
          </p>
        </div>
        <div>
          <p className="form-profile-label">
            <label className="form-profile-label">Free Accounts</label>
          </p>
          <p>
            <input className="form-profile-input"
                   type="text"
                   name="totalFreeAccounts"
                   id="totalFreeAccounts"
                   value={analytics.totalFreeAccounts}
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
                   name="totalSubscriptionsClosed"
                   id="totalSubscriptionsClosed"
                   value={analytics.totalSubscriptionsClosed}
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
                   name="totalAccountsClosed"
                   id="totalAccountsClosed"
                   value={analytics.totalAccountsClosed}
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
                   name="totalImagesUploaded"
                   id="totalImagesUploaded"
                   value={analytics.totalImagesUploaded}
            />
          </p>
        </div>
      </div> }
    </div>
  );
};

export default Subscriptions;