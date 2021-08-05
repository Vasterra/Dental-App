import React, {useState} from "react";
import {Formik} from "formik";
import {API} from "aws-amplify";
import {Auth, Hub, Storage} from "aws-amplify";
import {CognitoUser} from "amazon-cognito-identity-js";
import ApiManager from "src/services/ApiManager";
import {Router} from "next/router";

type Props = {
  currentDentist: any
}

const AccountInformation: React.FunctionComponent<Props> = ({currentDentist}) => {
  const [onCheck, setOnCheck] = useState()

  const onRemoveAccount = () => {
    if (onCheck) {
      Auth
        .currentAuthenticatedUser()
        .then((user: CognitoUser) => new Promise<void>((resolve, reject) => {
          ApiManager.signOut()
          user.deleteUser(error => {
            if (error) {
              return reject(error);
            }
            document.location.href = "/";
            resolve();
          });
          ApiManager.deleteDentist(currentDentist);
          ApiManager.CREATE_CLOSED_ACCOUNT(currentDentist.id);
        }))
        .catch(e => {
          console.log(e)
        });
    } else {
      console.log('check not true')
    }
  }

  const onCheckBox = ({ target }: any) => {
    setOnCheck(target.checked);
  };

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
                 value={currentDentist.gdcNumber}
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
                 value={onCheck}
                 onChange={onCheckBox}
          />
          <span className="checkbox-text">
                          I acknowledge that by deleting my account,
                          my profile and information will be permanently deleted.
                      </span>
        </p>
      </div>
      <p className="form-login-buttons">
        <button className="button-green" disabled={!onCheck} onClick={onRemoveAccount}>Delete Account</button>
      </p>
    </div>
  )
};

export default AccountInformation
