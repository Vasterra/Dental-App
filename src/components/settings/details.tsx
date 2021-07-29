import React, {useEffect, useState} from "react";
import ApiManager from "src/services/ApiManager";
import Error from "next/error"
import { Auth } from "aws-amplify";

const Details = () => {

  const [dentist, setDentist]: any = useState();
  const [currentAuthenticatedUser, setCurrentAuthenticatedUser]: any = useState();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailDentist, setEmailDentist] = useState('');

  useEffect(() => {
    getCurrentAuthenticatedUser();
  }, [])

  const getCurrentAuthenticatedUser = async () => {
    await Auth.currentAuthenticatedUser().then(result => {
      setCurrentAuthenticatedUser(result);
      getListDentists(result);
    })
  };

  const getListDentists = async (dentist: any) => {
    try {
      ApiManager.getListDentists().then(listDentitst => {
        listDentitst.map((item: any) => {
          if (item.id === dentist.attributes.sub) {
            const nameFull: any = item.firstName ? item.firstName : '' + ' ' + item.lastName ? item.lastName : ''
            const email: any = item.email ? item.email : ''
            setFullName(nameFull)
            setEmailDentist(email)
            setDentist(item)
          }
        })
      });
    } catch (e) {
      return <Error statusCode={404}/>
    }
  };

  const changePassword = async () => {
    await Auth.currentAuthenticatedUser()
    .then((user: any) => {
      return Auth.changePassword(user, oldPassword, newPassword);
    })
    .catch((err: any) => console.log(err));
  }

  return (
    <>
      { dentist && <div className="profile-box-form">
          <div className="form-info-block">
              <div>
                  <p className="form-login-title green px20">Admin Details</p>
                  <p className="form-login-subtitle gray px12 mb-6px">Login Details</p>
              </div>
          </div>
          <div className="box-2-box">
              <div className="profile-block-box">
                  <div>
                      <p className="form-profile-label">
                          <label className="form-profile-label" htmlFor="name">Name</label>
                      </p>
                      <p>
                          <input className="form-profile-input"
                                 type="text"
                                 name="name"
                                 id="name"
                                 value={fullName}
                                 onChange={(e) => setFullName(e.target.value)}
                                 placeholder="Admin Name" />
                      </p>
                  </div>
                  <div>
                      <p className="form-profile-label">
                          <label className="form-profile-label" htmlFor="email">Email</label>
                      </p>
                      <p>
                          <input className="form-profile-input"
                                 type="email"
                                 name="email"
                                 id="email"
                                 value={emailDentist}
                                 onChange={(e) => setEmailDentist(e.target.value)}
                                 placeholder="John.smith@dental.co.uk"
                          />
                      </p>
                  </div>
              </div>
              <div className="profile-block-box">
                  <div>
                      <p className="form-profile-label">
                          <label className="form-profile-label">Reset Password</label>
                      </p>
                      <p className="row-content">
                          <span className="input-span">Current</span>
                          <input className="form-profile-input"
                                 type="text"
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
                                 type="text"
                                 name="new"
                                 id="new"
                                 value={newPassword}
                                 onChange={(e) => setNewPassword(e.target.value)}
                                 placeholder="Xxxxx"
                          />
                      </p>
                  </div>
                  <p className="row-content">
                      <span className="input-span"></span>
                      <button className="button-green" onClick={changePassword}>Reset Password</button>
                  </p>
              </div>
          </div>
      </div>}
    </>
  );
};

export default Details;

