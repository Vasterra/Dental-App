import React from "react";

const CurrentMonth = ({}) => {
    return (
      <div className="profile-box-form">
        <div>
          <p className="form-login-title green px20">Current Month</p>
          <p className="form-login-subtitle gray px12 mb-6px">Summary</p>
          <div className="profile-block-box">
            <div className="double-blocks-5">
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">New Subscriptions</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id="" value="" placeholder="82"/>
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">New Free Accounts</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id="" value="" placeholder="2"/>
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Subscriptions Closed </label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id="" value="" placeholder="2"/>
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Accounts Closed</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id="" value="" placeholder="14"/>
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Images Uploaded</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id="" value="" placeholder="382"/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CurrentMonth;

