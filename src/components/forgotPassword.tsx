import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Router from 'next/router';
import Close from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { CloseButton } from './common/CloseButton';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStylesFacebook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      marginBottom: '27px'
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },
    top: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0
    },
    circle: {
      strokeLinecap: 'round'
    }
  })
);

function FacebookCircularProgress(props: CircularProgressProps) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant='indeterminate'
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle
        }}
        size={30}
        thickness={4}
        {...props}
      />
    </div>
  );
}

type Props = {
  backInSingIn: any,
  setValues: any,
  values: any
}

const ForgotPassword: React.FunctionComponent<Props> = ({ backInSingIn, setValues, values }) => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState('');

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const validate = (values: any) => {
    const passwordRegex = /(?=.*[0-9])/;
    const errors: any = {};

    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length > 25) {
      errors.username = 'Must be 25 characters or less';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = '*Password must be 8 characters long.';
    } else if (!passwordRegex.test(values.password)) {
      errors.password = '*Invalid password. Must contain one number.';
    }
  };

  const formikVerificationCode = useFormik({
    initialValues: {
      username: '',
      code: '',
      new_password: ''
    },
    validate,
    onSubmit: async (val: any) => {
      await Auth.forgotPasswordSubmit(val.username, val.code, val.new_password)
      .then(() => {
        setMessageSnackbar('Email has been successfully changed.');
        setSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          backInSingIn()
        },1500)
      })
      .catch(error => {
        setMessageSnackbar(error.message);
        setSeverity('warning');
        setOpenSnackbar(true);
      });
    }
  });

  const formikResetPassword = useFormik({
    initialValues: {
      username: ''
    },
    onSubmit: async (val: any) => {
      await Auth.forgotPassword(val.username)
      .then(() => {
        setMessageSnackbar('The confirmation code has been sent to your email.');
        setSeverity('success');
        setOpenSnackbar(true);
        setValues({ ...values, verificationCode: true });
      })
      .catch(error => {
        setMessageSnackbar(error.message);
        setSeverity('warning');
        setOpenSnackbar(true);
      });
    }
  });

  if (values.user) void Router.replace('/');

  return (
    <div className='main bg-login main-box'>
      {!values.verificationCode && <div className='form-login'>
        <p className='form-login-title green'>Reset Password</p>
        <form onSubmit={formikResetPassword.handleSubmit}>
          <p className='form-login-input'>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              value={formikResetPassword.values.username}
              onChange={formikResetPassword.handleChange}
            />
            <CloseButton
                   onClick={() => {
                     void formikResetPassword.setValues({ ...formikResetPassword.values, username: '' });
                   }} />
          </p>
          <p className='form-login-buttons'>
            <button className='button-green-password-reset' onClick={backInSingIn}>Back to Sign In</button>
            <button type='submit' className='button-green-password-reset'>{values.loaderButtonReset ?
              <FacebookCircularProgress /> : 'Verification Code'}</button>
          </p>
        </form>
        <div>{values.errorMessage}</div>
      </div>}
      {values.verificationCode && <div className='form-login'>
        <p className='form-login-title green'>Login</p>
        <p className='form-login-subtitle gray'>Current FYD users</p>
        <form onSubmit={formikVerificationCode.handleSubmit}>
          <p className='form-login-input'>
            <input
              type='text'
              name='code'
              id='code'
              placeholder='Verification code'
              value={formikVerificationCode.values.code}
              onChange={formikVerificationCode.handleChange}
            />
            <CloseButton
                   onClick={() => {
                     void formikVerificationCode.setValues({ ...formikVerificationCode.values, code: '' });
                   }} />
            {formikVerificationCode.errors.code ? <div>{formikVerificationCode.errors.code}</div> : null}
          </p>
          <p className='form-login-input'>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              value={formikVerificationCode.values.username}
              onChange={formikVerificationCode.handleChange}
            />
            <CloseButton
                   onClick={() => {
                     void formikVerificationCode.setValues({ ...formikVerificationCode.values, username: '' });
                   }} />
          </p>
          <p className='form-login-input'>
            <input
              type='password'
              name='new_password'
              id='new_password'
              placeholder='New Password'
              value={formikVerificationCode.values.new_password}
              onChange={formikVerificationCode.handleChange}
            />
            <CloseButton
                   onClick={() => {
                     void formikVerificationCode.setValues({ ...formikVerificationCode.values, new_password: '' });
                   }} />
            {formikVerificationCode.errors.new_password ?
              <div>{formikVerificationCode.errors.new_password}</div> : null}
          </p>
          <p className='form-login-buttons'>
            <button className='button-green' onClick={() => setValues({ ...values, verificationCode: false })}>Back
            </button>
            <button type='submit' className='button-green-password-reset'>{values.loaderButtonSubmit ?
              <FacebookCircularProgress /> : 'Reset Password'}</button>
          </p>
        </form>
        <div>{values.errorMessage}</div>
      </div>}
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}
                // @ts-ignore
               severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;

