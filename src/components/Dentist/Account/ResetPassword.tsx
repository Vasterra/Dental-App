import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

type Props = {
  setOpenSnackbar: any,
  setMessageSnackbar: any,
  setSeverity: any,
}

const ResetPassword: React.FunctionComponent<Props> = ({
     setOpenSnackbar,
     setMessageSnackbar,
     setSeverity
   }) => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changePassword = async () => {
    console.log('changePassword');
    try {
      await Auth.currentAuthenticatedUser().then((user: any) => {
        return Auth.changePassword(user, oldPassword, newPassword).then(() => {
          setMessageSnackbar('The password change successfully!');
          setSeverity('success');
          setOpenSnackbar(true);
        }).catch((error) => {
          setMessageSnackbar(error.message);
          setSeverity('warning');
          setOpenSnackbar(true);
        });
      });
    } catch (error) {
      setMessageSnackbar(error.message);
      setSeverity('warning');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className='profile-block-box'>
      <div>
        <p className='form-profile-label'>
          <label className='form-profile-label'>Reset Password</label>
        </p>
        <p className='row-content'>
          <span className='input-span'>Current</span>
          <input className='form-profile-input'
                 type='password'
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
                 type='password'
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
        <button className='button-green' disabled={newPassword.length < 2 || oldPassword.length < 2}
                onClick={changePassword}>Reset Password
        </button>
      </p>
    </div>
  );
};

export default ResetPassword;