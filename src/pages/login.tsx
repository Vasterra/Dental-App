import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Router from 'next/router';
import Close from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

interface State {
  username: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
  user: null;
  errorMessage: null;
  loader: null;
}

const Login = () => {

  const [values, setValues] = React.useState<State>({
    username: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    user: null,
    errorMessage: null,
    loader: null
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity]: any = useState();

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

    return void errors;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      gdcNumber: '',
      code: '',
      weight: '',
      weightRange: '',
      showPassword: false,
      user: null
    },
    validate,
    onSubmit: async (values: any) => {
      try {
        const user = await Auth.signIn(values.username, values.password);
        setMessageSnackbar('The Login successfully!');
        setSeverity('success');
        setOpenSnackbar(true);
        setValues({ ...values, user });
      } catch (error) {
        setMessageSnackbar(error.message);
        setSeverity('warning');
        setOpenSnackbar(true);
        setValues({ ...values, errorMessage: error.message });
      }
    }
  });

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return values.user ? (
    <div className='main bg-login main-box'>
      {!values.loader && <div className='form-login'>
        <p className='form-login-title green'>Login</p>
        <p className='form-login-subtitle gray'>Current FYD users</p>
        <form onSubmit={formik.handleSubmit}>
          <p className='form-login-input'>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <Close className='form-login-input-close'
                   onClick={() => {
                     void formik.setValues({ ...formik.values, username: '' });
                   }} />
            {formik.errors.username ? <div>{formik.errors.username}</div> : null}
          </p>
          <p className='form-login-input'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Close className='form-login-input-close'
                   onClick={() => {
                     void formik.setValues({ ...formik.values, password: '' });
                   }} />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          </p>
          <div>{values.errorMessage}</div>
          <p className='form-login-buttons'>
            <button type='submit' className='button-green'>Login</button>
          </p>
        </form>
      </div>}
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </div>
  ) : <Login />;
};

export default Login;