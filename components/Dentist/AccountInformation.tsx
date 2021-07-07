import React from "react";
import {Formik} from "formik";
import {API} from "aws-amplify";

type Props = {
  currentDentist: any,
  getDentist: Function,
}

const AccountInformation: React.FunctionComponent<Props> = ({currentDentist, getDentist}) => {

  return (
    <div className="profile-block-box">
      <div>
        <p className="form-profile-label">
          <label className="form-profile-label" htmlFor="email">Account Email</label>
        </p>
        <p>
          <input className="form-profile-input"
                 type="email"
                 name="email"
                 id="email"
                 value={currentDentist.email}
          />
        </p>
      </div>

      <div>
        <p className="form-profile-label disabled">
          <label className="form-profile-label" htmlFor="gdc_number">GDC Number</label>
        </p>
        <p>
          <input className="form-profile-input"
                 type="text"
                 name="gdc_number"
                 id="gdc_number"
                 value=""
                 placeholder="12345678"
                 disabled
          />
        </p>
      </div>
      <div>
        <p className="form-profile-label ">
          <label className="form-profile-label" htmlFor="delete">Delete Account</label>
        </p>
        <p className="checkbox">
          <input type="checkbox"
                 name="delete"
                 id="delete"
                 value=""
          />
          <span className="checkbox-text">
                          I acknowledge that by deleting my account,
                          my profile and information will be permanently deleted.
                      </span>
        </p>
      </div>
      <p className="form-login-buttons">
        <button className="button-green">Delete Account</button>
      </p>
    </div>
  )
};

export default AccountInformation
