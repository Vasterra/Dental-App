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
import { listDentists } from 'src/graphql/queries';
import { convertCityCoords } from 'src/utils/search/converCityCoords';
import watermark from '../utils/watermark/builded/index'

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
        const user = await Auth.signIn(val.email, val.password);
        setValues({ ...values, user });

        const dentists: any = await API.graphql({
          query: listDentists,
          // @ts-ignore
          authMode: 'AWS_IAM'
        });
        const dentistEmail = dentists.data.listDentists.items.find((item: { email: any; }) => item.email === user.attributes.email);
        setValues({ ...values, loader: true });
        if (dentists.data.listDentists.items.length !== 0) {
          if (!dentistEmail) {
            await createNewDentist(user);
          }
        } else {
          await createNewDentist(user);
        }


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
            firstName: user.attributes.name,
            registered: true,
            phone: user.attributes.phone_number,
            gdcNumber: user.attributes['custom:gdcNumber']
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      await Router.replace('/');
    });
  }

  const backInSingIn = () => {
    setValues({ ...values, resetPassword: false });
  };

  if (values.user) void Router.replace('/');

  /* example of watermark creation ---------------------------------- start ------------------------------- */
  const wm = () =>{ 
    watermark(['data:image/jpeg;base64,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', 'data:image/jpeg;base64,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'])
        .image(watermark.image.lowerRight(0.9))
        .then((img: any) => document.getElementById('exp')!.appendChild(img));
  }
   /* example of watermark creation ---------------------------------- end ------------------------------- */

  return (

    /* example of using watermark ---------------------------------- start ------------------------------- */
    <div className='main bg-login main-box'>
      <button onClick={wm}>watermark run</button>
      <div id='exp'></div>
     {/* example of using watermark ---------------------------------- end -------------------------------  */}
     
      {values.resetPassword && <ForgotPassword backInSingIn={backInSingIn} setValues={setValues} values={values} />}
      {!values.resetPassword && <div className='form-login'>
        <p className='form-login-title green'>Login</p>
        <p className='form-login-subtitle gray'>Current FYD users</p>
        <form onSubmit={formikAuth.handleSubmit}>
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
            {formikAuth.errors.email ? <div>{formikAuth.errors.email}</div> : null}
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
              <img className='form-login-input-close' src='../images/close.svg' onClick={() => {
                void formikAuth.setValues({ ...formikAuth.values, password: '' });
              }} />
            {formikAuth.errors.password ? <div>{formikAuth.errors.password}</div> : null}
          </p>
          <div className='form-login-buttons'>
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

