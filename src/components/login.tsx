import React, { SyntheticEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import Router from 'next/router';
import Close from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import ForgotPassword from 'src/components/forgotPassword';

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

interface State {
  username: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
  user: null;
  errorMessage: null;
  resetPassword: boolean;
  loader: boolean;
  loaderButtonSubmit: boolean;
  loaderButtonReset: boolean;
}

const Login = () => {
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    user: null,
    errorMessage: null,
    resetPassword: false,
    loaderButtonSubmit: false,
    loaderButtonReset: false,
    loader: false
  });
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

  const formikAuth = useFormik({
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
    onSubmit: async (val: any) => {
      setValues({ ...values, loaderButtonSubmit: true });
      try {
        const user = await Auth.signIn(val.username, val.password);
        setValues({ ...values, user });
        setMessageSnackbar('The Login successfully!');
        setSeverity('success');
        setOpenSnackbar(true);
        setValues({ ...values, loaderButtonSubmit: false });
        setValues({ ...values, loader: true });
      } catch (error) {
        setMessageSnackbar(error.message);
        setSeverity('warning');
        setOpenSnackbar(true);
        setValues({ ...values, errorMessage: error.message });
      }
    }
  });

  const backInSingIn = () => {
    setValues({ ...values, resetPassword: false });
  };

  if (values.user) void Router.replace('/');


  return (
    <div className='main bg-login main-box'>
      {values.resetPassword && <ForgotPassword backInSingIn={backInSingIn} setValues={setValues} values={values} />}
      {!values.resetPassword && <div className='form-login'>
        <p className='form-login-title green'>Login</p>
        <p className='form-login-subtitle gray'>Current FYD users</p>
        <form onSubmit={formikAuth.handleSubmit}>
          <p className='form-login-input'>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              value={formikAuth.values.username}
              onChange={formikAuth.handleChange}
            />
            <Close className='form-login-input-close'
                   onClick={() => {
                     void formikAuth.setValues({ ...formikAuth.values, username: '' });
                   }} />
            {formikAuth.errors.username ? <div>{formikAuth.errors.username}</div> : null}
          </p>
          <p className='form-login-input'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={formikAuth.values.password}
              onChange={formikAuth.handleChange}
            />
            <Close className='form-login-input-close'
                   onClick={() => {
                     void formikAuth.setValues({ ...formikAuth.values, password: '' });
                   }} />
            {formikAuth.errors.password ? <div>{formikAuth.errors.password}</div> : null}
          </p>
          <p className='form-login-buttons'>
            <button type='submit' disabled={values.loader} className='button-green'>{values.loaderButtonSubmit ?
              <FacebookCircularProgress /> : 'Login'}</button>
            <button className='button-white' disabled={values.loader} onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              setValues({ ...values, resetPassword: true });
            }}>Reset password
            </button>
          </p>
        </form>
        <div>{values.errorMessage}</div>
      </div>
      }
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

export default Login;

