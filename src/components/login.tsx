import React from 'react';
import { API, Auth } from 'aws-amplify';
import Router from 'next/router';
import { createDentist } from 'src/graphql/mutations';
import { listDentists } from 'src/graphql/queries';
import { convertCityCoords } from 'src/utils/search/converCityCoords';
import Close from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { WrapperFlex } from '../styles/Main.module';
import { CircularProgress } from '@material-ui/core';

interface State {
  username: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
  user: null;
  loader: null;
}

const Login = ({}) => {

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
      user: null
    },
    validate,
    onSubmit: async (values: any) => {
      try {
        const user = await Auth.signIn(values.username, values.password);
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

      } catch (error) {
        setValues({ ...values, errorMessage: error.message });
        console.log('error signing in', error);
      }
    }
  });

  async function createNewDentist(user: { attributes: { sub: any; email: any; phone_number: any; }; }) {
    await convertCityCoords().then(async (result) => {
      await API.graphql({
        query: createDentist,
        variables: {
          input: {
            id: user.attributes.sub,
            email: user.attributes.email,
            lat: result.lat,
            lng: result.lng,
            firstName: values.username,
            registered: true,
            phone: user.attributes.phone_number
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      await Router.replace('/');
    });
  }

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (values.user) Router.replace('/');

  return (
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
                     formik.setValues({ ...formik.values, username: '' });
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
                     formik.setValues({ ...formik.values, password: '' });
                   }} />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          </p>
          <p className='form-login-buttons'>
            <button type='submit' className='button-green'>Login</button>
            <button className='button-white'>Reset password</button>
          </p>
        </form>
        <div>{values.errorMessage}</div>
      </div>
      }
      {values.loader && <WrapperFlex><CircularProgress size={120} /></WrapperFlex>}
    </div>
  );
};

export default Login;

