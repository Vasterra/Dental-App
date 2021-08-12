import React, { useState } from 'react';
import ButtonForm from './Buttons/ButtonForm';
import { Snackbar, TextField } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import Router from 'next/router';
import Close from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { Alert } from '@material-ui/lab';

interface State {
  username: string;
  password: string;
  email: string;
  gdcNumber: string;
  code: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
  user: null;
  errorMessage: null;
  loader: boolean;
  loaderButtonSubmit: boolean;
}

const Registration = ({}) => {
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    email: '',
    gdcNumber: '',
    code: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    user: null,
    errorMessage: null,
    loader: false,
    loaderButtonSubmit: false
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
    const gdcNumberRegex = /^\d+$/;
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

    if (!values.gdcNumber) {
      errors.gdcNumber = 'Required';
    } else if (values.gdcNumber.length > 6) {
      errors.gdcNumber = 'Must be 6 characters or less';
    } else if (!gdcNumberRegex.test(values.gdcNumber)) {
      errors.gdcNumber = 'Only number';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return errors;
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
      user: null,
      errorMessage: null,
      loader: false,
      loaderButtonSubmit: false
    },
    validate,
    onSubmit: async (values: any) => {
      try {
        const { user }: any = await Auth.signUp({
          username: values.email,
          password: values.password,
          attributes: {
            email: values.email,
            name: values.username,
            'custom:gdcNumber': values.gdcNumber
          }
        });
        setValues({ ...values, user });
      } catch (error) {
        setMessageSnackbar(error.message);
        setSeverity('warning');
        setOpenSnackbar(true);
        setValues({ ...values, errorMessage: error.message });
      }
    }
  });

  async function confirmSignUp(event: { preventDefault: () => void; }) {
    event.preventDefault();
    try {
      setValues({ ...values, user: null });
      setValues({ ...values, loader: true });
      await Auth.confirmSignUp(values.email, values.code);
      setMessageSnackbar('The Register successfully!');
      setSeverity('success');
      setOpenSnackbar(true);
      await Router.replace('/login');
    } catch (error) {
      setMessageSnackbar(error.message);
      setSeverity('warning');
      setOpenSnackbar(true);
      setValues({ ...values, loader: false });
    }
  }

  return (
    <div className='main bg-singup main-box'>
      {!values.loader && <div className='form-login'>
        <p className='form-login-title green'>Sign Up</p>
        <p className='form-login-subtitle gray'>Create An Account with FYD
        </p>
        {!values.user &&
        <form onSubmit={formik.handleSubmit}>
          <p className='form-login-input'>
            <input
              type='text'
              id='username'
              name='username'
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
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <Close className='form-login-input-close'
                   onClick={() => {
                     void formik.setValues({ ...formik.values, email: '' });
                   }} />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </p>
          <p className='form-login-input'>
            <input
              type='text'
              name='gdcNumber'
              id='gdcNumber'
              placeholder='GDC Number (this cannot be updated later)'
              value={formik.values.gdcNumber}
              onChange={formik.handleChange}
            />
            <Close className='form-login-input-close'
                   onClick={() => {
                     void formik.setValues({ ...formik.values, gdcNumber: '' });
                   }} />
            {formik.errors.gdcNumber ? <div>{formik.errors.gdcNumber}</div> : null}
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
          <p className='form-login-buttons'>
            <button type='submit' className='button-green'>Sign Up</button>
          </p>
        </form>
        }

        {values.user && <form onSubmit={confirmSignUp} className='login-form-wrapper'>
          <TextField
            id='filled-password-input'
            label='Confirm'
            type='number'
            className='input-form'
            placeholder='confirm'
            onChange={(e) => setValues({ ...values, code: e.target.value })}
            margin='normal'
            variant='outlined'
          />
          <ButtonForm title='Confirm'>Confirm</ButtonForm>
        </form>
        }
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

export default Registration;
