import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import ApiManager from '../../services/ApiManager';

type Props = {
  setOpenSnackbar: any,
  setMessageSnackbar: any,
  setSeverity: any
}

const Details: React.FunctionComponent<Props> = ({ setOpenSnackbar, setMessageSnackbar, setSeverity }) => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentAuthenticatedUser, setCurrentAuthenticatedUser] = useState(null);
  const [nameCurrentAuthenticatedUser, setNameCurrentAuthenticatedUser] = useState('');
  const [emailCurrentAuthenticatedUser, setEmailCurrentAuthenticatedUser] = useState('');

  useEffect(() => {
    void getCurrentAuthenticatedUser();
  }, []);

  const getCurrentAuthenticatedUser = async () => {
    setCurrentAuthenticatedUser(null);
    await Auth.currentAuthenticatedUser().then(result => {
      setCurrentAuthenticatedUser(result);
      setNameCurrentAuthenticatedUser(result.attributes.name);
      setEmailCurrentAuthenticatedUser(result.attributes.email);
    });
  };

  const changeHandlerAdmin = async () => {
    await Auth.updateUserAttributes(currentAuthenticatedUser, {
      'email': emailCurrentAuthenticatedUser,
      'name': nameCurrentAuthenticatedUser
    }).catch(error => {
      setMessageSnackbar(error.message);
      setSeverity('warning');
      setOpenSnackbar(true);
    });
    setMessageSnackbar('The Login Details was changed successfully!');
    setSeverity('success');
    setOpenSnackbar(true);
  };

  const changePassword = async () => {
    console.log(currentAuthenticatedUser);
    await Auth.changePassword(currentAuthenticatedUser, oldPassword, newPassword).then(() => {
      setMessageSnackbar('The password was changed successfully!');
      setSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        void ApiManager.signOut();
      }, 2000);
    }).catch(error => {
      setMessageSnackbar(error.message);
      setSeverity('warning');
      setOpenSnackbar(true);
    });
  };

  return (
    <>
      <div className='profile-box-form'>
        {!currentAuthenticatedUser && <div className='flex-wrapper'><CircularProgress size={120} /></div>}
        {currentAuthenticatedUser &&
        <>
          <div className='form-info-block'>
            <div>
              <p className='form-login-title green px20'>Admin Details</p>
              <p className='form-login-subtitle gray px12 mb-6px'>Login Details</p>
            </div>
          </div>
          <div className='box-2-box'>
            <div className='profile-block-box'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label' htmlFor='name'>Name</label>
                </p>
                <p>
                  <input className='form-profile-input'
                         type='text'
                         name='name'
                         id='name'
                         value={nameCurrentAuthenticatedUser}
                         onChange={(e) => setNameCurrentAuthenticatedUser(e.target.value)}
                         placeholder='Admin Name' />
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label' htmlFor='email'>Email</label>
                </p>
                <p>
                  <input className='form-profile-input'
                         type='email'
                         name='email'
                         id='email'
                         value={emailCurrentAuthenticatedUser}
                         onChange={(e) => setEmailCurrentAuthenticatedUser(e.target.value)}
                         placeholder='John.smith@dental.co.uk'
                  />
                </p>
              </div>
              <button className='button-green' onClick={changeHandlerAdmin}>Save</button>
            </div>
            <div className='profile-block-box'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Reset Password</label>
                </p>
                <p className='row-content'>
                  <span className='input-span'>Current</span>
                  <input className='form-profile-input'
                         type='text'
                         name='current'
                         id='current'
                         value={oldPassword}
                         onChange={(e) => setOldPassword(e.target.value)}
                         placeholder='XXXXXXXXXXXXXXX'
                  />
                </p>
                <p className='row-content'>
                  <span className='input-span'>New</span>
                  <input className='form-profile-input'
                         type='text'
                         name='new'
                         id='new'
                         value={newPassword}
                         onChange={(e) => setNewPassword(e.target.value)}
                         placeholder='XXXXXXXXXXXXXXX'
                  />
                </p>
              </div>
              <p className='row-content'>
                <span className='input-span' />
                <button className='button-green' onClick={changePassword}>Reset Password</button>
              </p>
            </div>
          </div>
        </>
        }
      </div>
    </>
  );
};

export default Details;

