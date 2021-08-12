import React, { useState } from "react";
import {Formik} from "formik";
import {API} from "aws-amplify";
import ApiManager from "src/services/ApiManager";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changePassword = () => {
    ApiManager.changePassword(oldPassword, newPassword)
  }

  return (
    <div className="profile-block-box">
      <div>
        <p className="form-profile-label">
          <label className="form-profile-label" >Reset Password</label>
        </p>
        <p className="row-content">
          <span className="input-span">Current</span>
          <input className="form-profile-input"
                 type="password"
                 name="current"
                 id="current"
                 value={oldPassword}
                 onChange={(e) => setOldPassword(e.target.value)}
                 placeholder="XXXXXXXXXXXXXXX"
          />
        </p>
        <p className="row-content">
          <span className="input-span">New</span>
          <input className="form-profile-input"
                 type="password"
                 name="new"
                 id="new"
                 value={newPassword}
                 onChange={(e) => setNewPassword(e.target.value)}
                 placeholder="XXXXXXXXXXXXXXX"
          />
        </p>
      </div>
      <p className="row-content">
        <span className="input-span"></span>
        <button className="button-green" onClick={changePassword}>Reset Password</button>
      </p>
    </div>
  )
};

export default ResetPassword