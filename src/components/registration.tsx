import React, {useState} from "react";
import ButtonForm from "./Buttons/ButtonForm";
import {TextField} from "@material-ui/core";
import {Auth} from "aws-amplify";
import Router from "next/router";
import Close from "@material-ui/icons/Close";
import {useFormik} from 'formik';

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
      errors.password = "*Password must be 8 characters long.";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "*Invalid password. Must contain one number.";
    }

    if (!values.gdcNumber) {
      errors.gdcNumber = 'Required';
    } else if (values.gdcNumber.length > 15) {
      errors.gdcNumber = 'Must be 15 characters or less';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
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
      user: null,
    },
    validate,
    onSubmit: async (values: any) => {
      try {
        const {user}: any = await Auth.signUp({
          username: values.username,
          password: values.password,
          attributes: {
            email: values.email,
            // gdcNumber: values.gdcNumber,
          }
        });
        setValues({...values, user})
      } catch (error) {
        setValues({...values, errorMessage: error.message})
        console.log('error signing up:', error);
      }
    },
  });

  async function confirmSignUp(event: { preventDefault: () => void; }) {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(values.username, values.code);
      await Router.replace('/login')
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  return (
    <div className="main bg-singup main-box">
      <div className="form-login">
        <p className="form-login-title green">Sign Up</p>
        <p className="form-login-subtitle gray">Create An Account with FYD
        </p>
        {!values.user &&
        <form onSubmit={formik.handleSubmit}>
            <p className="form-login-input">
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                <Close className="form-login-input-close"
                       onClick={() => {
                         formik.setValues({...formik.values, username: ''})
                       }}/>
              {formik.errors.username ? <div>{formik.errors.username}</div> : null}

            </p>
            <p className="form-login-input">
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    id="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                />
                <Close className="form-login-input-close"
                       onClick={() => {
                         formik.setValues({...formik.values, email: ''})
                       }}/>
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </p>
            <p className="form-login-input">
                <input
                    type="text"
                    name="gdcNumber"
                    value={formik.values.gdcNumber}
                    id="gdcNumber"
                    placeholder="GDC Number (this cannot be updated later)"
                    onChange={formik.handleChange}
                />
                <Close className="form-login-input-close"
                       onClick={() => {
                         formik.setValues({...formik.values, gdcNumber: ''})
                       }}/>
              {formik.errors.gdcNumber ? <div>{formik.errors.gdcNumber}</div> : null}
            </p>
            <p className="form-login-input">
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    id="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                />
                <Close className="form-login-input-close"
                       onClick={() => {
                         formik.setValues({...formik.values, password: ''})
                       }}/>
              {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            </p>
            <p className="form-login-buttons">
                <button type="submit" className="button-green">Sign Up</button>
            </p>
        </form>
        }{values.user &&
      <form onSubmit={confirmSignUp} className="login-form-wrapper">
          <TextField
              id="filled-password-input"
              label="Confirm"
              type="number"
              className="input-form"
              placeholder="confirm"
              onChange={(e) => setValues({...values, code: e.target.value})}
              margin="normal"
              variant="outlined"
          />
          <ButtonForm title='Confirm'>Confirm</ButtonForm>
      </form>
      }
        <div>{values.errorMessage}</div>
      </div>
    </div>
  );
};

export default Registration
