import React, { SyntheticEvent, useState } from 'react';
import { API, Auth } from 'aws-amplify';
import Router from 'next/router';
import { useFormik } from 'formik';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import ForgotPassword from 'src/components/forgotPassword';
import { createDentist } from 'src/graphql/mutations';
import { convertCityCoords } from 'src/utils/search/converCityCoords';
import { AuthInputError, AuthInputWrapper } from '../styles/Auth.module';
import ApiManager from 'src/services/ApiManager';

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
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = '*Password must be 8 characters long.';
    } else if (!passwordRegex.test(values.password)) {
      errors.password = '*Invalid password. Must contain one number.';
    }
    return errors
  };

  const formikAuth = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      showPassword: false,
    },
    validate,
    onSubmit: async (val: any) => {
      setValues({ ...values, loaderButtonSubmit: true });
      try {
        const user = await Auth.signIn(val.email, val.password);
        setValues({ ...values, user });

        const dentists: any[] = await ApiManager.getListDentists()
        ;
        const dentistEmail = dentists.find((item: { email: any; }) => item.email === user.attributes.email);
        setValues({ ...values, loader: true });
        console.log(dentists);
        if (dentists.length !== 0) {
          if (!dentistEmail) {
            await createNewDentist(user);
          }
        } else {
          await createNewDentist(user);
        }
        setMessageSnackbar('Login Successful');
        setSeverity('success');
        setOpenSnackbar(true);
      } catch (error: any) {
        setValues({ ...values, loaderButtonSubmit: false, loader: false });
        setMessageSnackbar(error.message);
        setSeverity('warning');
        setOpenSnackbar(true);
      }
    }
  });

  async function createNewDentist(user: any) {
    await convertCityCoords().then(async (result) => {
      await API.graphql({
        query: createDentist,
        variables: {
          input: {
            id: user.attributes.sub,
            email: user.attributes.email,
            lat: result.lat,
            lng: result.lng,
            isDisabled: false,
            firstName: user.attributes.name,
            registered: true,
            phone: user.attributes.phone_number,
            gdcNumber: user.attributes['custom:gdcNumber']
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });

      const url: any = localStorage.getItem('site')
      if (url.host === 'dev.d2qap6yh626x1j.amplifyapp.com/purchase') {
        return await Router.replace('/purchase');
      }
      await Router.replace('/');
    });
  }

  const backInSingIn = () => {
    setValues({ ...values, resetPassword: false });
  };

  if (values.user) void Router.replace('/');

  return (

    <div className='main bg-login main-height-full'>
      {values.resetPassword && <ForgotPassword backInSingIn={backInSingIn} setValues={setValues} values={values} />}
      {!values.resetPassword && <div className='form-login'>
        <p className='form-login-title green'>Login</p>
        <p className='form-login-subtitle gray'>Current FYD users</p>
        <form onSubmit={formikAuth.handleSubmit}>
          <AuthInputWrapper>
            <p className='form-login-input'>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                value={formikAuth.values.email}
                onChange={formikAuth.handleChange}
              />
              <img className='form-login-input-close' src='../images/close.svg' onClick={() => {
                void formikAuth.setValues({ ...formikAuth.values, email: '' });
              }} />
            </p>
            {formikAuth.errors.email ? <AuthInputError>{formikAuth.errors.email}</AuthInputError> : null}
          </AuthInputWrapper>
          <AuthInputWrapper>
            <p className='form-login-input' style={{position: 'relative'}}>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                value={formikAuth.values.password}
                onChange={formikAuth.handleChange}
              />
              {/* <span style={{ position: 'absolute', top: '-5px', fontSize: '12px', color: 'red', width: '100%'}}>{formikAuth.errors.password}</span> */}
              <img className='form-login-input-close' src='../images/close.svg' onClick={() => {
                void formikAuth.setValues({ ...formikAuth.values, password: '' });
              }} />
            </p>
            {formikAuth.errors.password ? <AuthInputError>{formikAuth.errors.password}</AuthInputError> : null}
          </AuthInputWrapper>
          <div className='form-login-buttons' style={{ marginTop: '30px' }}>
            <button type='submit' disabled={values.loader} className='button-green'>{values.loaderButtonSubmit ?
              <FacebookCircularProgress /> : 'Login'}</button>
            <button className='button-white' disabled={values.loader} onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              setValues({ ...values, resetPassword: true });
            }}>Reset password
            </button>
          </div>
        </form>
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

