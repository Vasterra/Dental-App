import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import ApiManager from 'src/services/ApiManager';
import { CognitoUser } from 'amazon-cognito-identity-js';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

type Props = {
  currentDentist: any
}

const AccountInformation: React.FunctionComponent<Props> = ({ currentDentist }) => {
  const [onCheck, setOnCheck] = useState();
  const [deleteAccount, setDeleteAccount] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCheckBox = ({ target }: any) => {
    setOnCheck(target.checked);
  };

  const onRemoveAccount = () => {
    if (deleteAccount.toUpperCase() === 'DELETE') {
      if (onCheck) {
        handleClose();
        Auth.currentAuthenticatedUser()
        .then((user: CognitoUser) => new Promise<void>((resolve, reject) => {
          document.location.href = '/login';
          void ApiManager.signOut();
          user.deleteUser(error => {
            if (error) {
              return reject(error);
            }
            void ApiManager.deleteDentist(currentDentist);
            void ApiManager.CREATE_CLOSED_ACCOUNT(currentDentist.id);
            document.location.href = '/login';
            resolve();
          });
        }))
        .catch(e => {
          console.log(e);
        });
      } else {
        console.log('check not true');
      }
    }
  };

  return (
    <div className='profile-block-box'>
      <div>
        <p className='form-profile-label'>
          <label className='form-profile-label' htmlFor='email'>Account Email</label>
        </p>
        <p>
          <input className='form-profile-input'
                 type='email'
                 name='email'
                 id='email'
                 value={currentDentist.email}
          />
        </p>
      </div>

      <div>
        <p className='form-profile-label disabled'>
          <label className='form-profile-label' htmlFor='gdc_number'>GDC Number</label>
        </p>
        <p>
          <input className='form-profile-input'
                 type='text'
                 name='gdc_number'
                 id='gdc_number'
                 value={currentDentist.gdcNumber}
                 placeholder='12345678'
                 disabled
          />
        </p>
      </div>
      <div>
        <p className='form-profile-label '>
          <label className='form-profile-label' htmlFor='delete'>Delete Account</label>
        </p>
        <p className='checkbox'>
          <input type='checkbox'
                 name='delete'
                 id='delete'
                 value={onCheck}
                 onChange={onCheckBox}
          />
          <span className='checkbox-text'>
                          I acknowledge that by deleting my account,
                          my profile and information will be permanently deleted.
                      </span>
        </p>
      </div>
      <p className='form-login-buttons'>
        <div>
          <button className='button-green' disabled={!onCheck} onClick={handleClickOpen}>Delete Account</button>
          <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='customized-dialog-title'><p>Delete Account</p></DialogTitle>
            <DialogContent>
              <DialogContentText>
                <p>You are about to permanently delete your account, and all of the issues, merge requests, and groups
                  linked to your account. Once you confirm Delete account, it cannot be undone or recovered.</p>
                <br />
                <h5>Type "DELETE" to confirm:</h5>
              </DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                id='delete'
                label='Delete Account'
                type='text'
                onChange={(e) => setDeleteAccount(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={onRemoveAccount} color='primary'>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      </p>
    </div>
  );
};

export default AccountInformation;
