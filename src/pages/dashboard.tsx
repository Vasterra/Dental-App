
import React, {useEffect, useState} from "react";
import {API, Auth} from "aws-amplify";
import Router from "next/router";
import {createDentist, deleteDentist, updateDentist} from "src/graphql/mutations";
import {listDentists} from "src/graphql/queries";
import {convertCityCoords} from "src/utils/search/converCityCoords";
import Close from '@material-ui/icons/Close';
import {v4 as uuidv4} from 'uuid';
import CardDentistComponent from "src/components/Search/CardDentist";
import {WrapperFlex} from "src/styles/Main.module";
import {CircularProgress} from "@material-ui/core";

interface State {
  username: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
  user: null;
  firstName: string;
  lastName: string;
  phone: string;
  qualifications: string;
  bio: string;
  website: string;
  address: string;
  city: string;
  street: string;
  postIndex: string;
  email: string;
  lat: string;
  lng: string;
}

const Login = ({}) => {

  const [dentists, setDentist]: any = useState();
  const [currentDentist, setCurrentDentist]: any = useState();

  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    user: null,
    firstName: '',
    lastName: '',
    phone: '',
    qualifications: '',
    bio: '',
    website: '',
    address: '',
    city: '',
    street: '',
    postIndex: '',
    email: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    getDentistList()
  }, [])

  async function generateNewDentist(event: any) {
    event.preventDefault();
    try {
      const result = await API.graphql({
        query: createDentist,
        variables: {
          input: {
            id: uuidv4(),
            lat: values.lat,
            lng: values.lng,
            registered: true,
            phone: values.phone,
            firstName: values.firstName,
            lastName: values.lastName,
            qualifications: values.qualifications,
            bio: values.bio,
            website: values.website,
            address: values.address,
            city: values.city,
            street: values.street,
            postIndex: values.postIndex,
            email: values.email
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      })
      getDentistList();
      console.log(result)
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function updateCurrentDentist(event: any) {
    event.preventDefault();
    try {
      const result = await API.graphql({
        query: updateDentist,
        variables: {
          input: {
            id: currentDentist.id,
            lat: currentDentist.lat,
            lng: currentDentist.lng,
            registered: currentDentist.registered,
            phone: currentDentist.phone,
            firstName: currentDentist.firstName,
            lastName: currentDentist.lastName,
            qualifications: currentDentist.qualifications,
            bio: currentDentist.bio,
            website: currentDentist.website,
            address: currentDentist.address,
            city: currentDentist.city,
            street: currentDentist.street,
            postIndex: currentDentist.postIndex,
            email: currentDentist.email
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      })
      getDentistList();
      console.log(result)
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const deleteCurrentDentist = async (event: any) => {
    event.preventDefault();
    try {
      const result = await API.graphql({
        query: deleteDentist,
        variables: {
          input: {
            id: currentDentist.id,
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      })
      setCurrentDentist(null)
      getDentistList();
      console.log(result)
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const getDentistList = async () => {
    setDentist(null)
    try {
      const dentists: any = await API.graphql({
        query: listDentists,
        // @ts-ignore
        authMode: 'AWS_IAM'
      })
      setDentist(dentists.data.listDentists.items)
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const setFunctCurrentDentist = (currentDentist: any) => {
    setCurrentDentist(currentDentist)
  }

  if (values.user) Router.replace('/')

  return (

    <div className="flex-container">
      <div className="block-container">
        {!currentDentist && <div className="form-login">
            <p className="form-login-title green">Generate new Dentist</p>
            <form onSubmit={generateNewDentist}>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        id="firstName"
                        placeholder="firstName"
                        onChange={(e) => setValues({...values, firstName: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setValues({...values, firstName: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        id="lastName"
                        placeholder="lastName"
                        onChange={(e) => setValues({...values, lastName: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setValues({...values, lastName: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="phone"
                        value={values.phone}
                        id="phone"
                        placeholder="phone"
                        onChange={(e) => setValues({...values, phone: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setValues({...values, phone: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="qualifications"
                        value={values.qualifications}
                        id="qualifications"
                        placeholder="qualifications"
                        onChange={(e) => setValues({...values, qualifications: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setValues({...values, qualifications: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="bio"
                        value={values.bio}
                        id="bio"
                        placeholder="bio"
                        onChange={(e) => setValues({...values, bio: e.target.value})}
                    />
                    <Close className="form-login-input-close" onClick={() => setValues({...values, bio: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="website"
                        value={values.website}
                        id="website"
                        placeholder="website"
                        onChange={(e) => setValues({...values, website: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setValues({...values, website: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="address"
                        value={values.address}
                        id="address"
                        placeholder="address"
                        onChange={(e) => setValues({...values, address: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setValues({...values, address: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="city"
                        value={values.city}
                        id="city"
                        placeholder="city"
                        onChange={(e) => setValues({...values, city: e.target.value})}
                    />
                    <Close className="form-login-input-close" onClick={() => setValues({...values, city: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="street"
                        value={values.street}
                        id="street"
                        placeholder="street"
                        onChange={(e) => setValues({...values, street: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setValues({...values, street: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="postIndex"
                        value={values.postIndex}
                        id="postIndex"
                        placeholder="postIndex"
                        onChange={(e) => setValues({...values, postIndex: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setValues({...values, postIndex: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="email"
                        value={values.email}
                        id="email"
                        placeholder="email"
                        onChange={(e) => setValues({...values, email: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setValues({...values, email: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="lat"
                        value={values.lat}
                        id="lat"
                        placeholder="lat"
                        onChange={(e) => setValues({...values, lat: e.target.value})}
                    />
                    <Close className="form-login-input-close" onClick={() => setValues({...values, lat: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="lng"
                        value={values.lng}
                        id="lng"
                        placeholder="lng"
                        onChange={(e) => setValues({...values, lng: e.target.value})}
                    />
                    <Close className="form-login-input-close" onClick={() => setValues({...values, lng: ''})}/>
                </p>
                <p className="form-login-buttons">
                    <button type="submit" className="button-green">Generate</button>
                </p>
            </form>
        </div>}
        {currentDentist && <div className="form-login">
            <p className="form-login-title green">Update Dentist</p>
            <form onSubmit={updateCurrentDentist}>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="id"
                        value={currentDentist.id}
                        id="id"
                        placeholder="id"
                        disabled
                    />
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="firstName"
                        value={currentDentist.firstName}
                        id="firstName"
                        placeholder="firstName"
                        onChange={(e) => setCurrentDentist({...currentDentist, firstName: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, firstName: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="lastName"
                        value={currentDentist.lastName}
                        id="lastName"
                        placeholder="lastName"
                        onChange={(e) => setCurrentDentist({...currentDentist, lastName: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, lastName: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="phone"
                        value={currentDentist.phone}
                        id="phone"
                        placeholder="phone"
                        onChange={(e) => setCurrentDentist({...currentDentist, phone: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, phone: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="qualifications"
                        value={currentDentist.qualifications}
                        id="qualifications"
                        placeholder="qualifications"
                        onChange={(e) => setCurrentDentist({...currentDentist, qualifications: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, qualifications: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="bio"
                        value={currentDentist.bio}
                        id="bio"
                        placeholder="bio"
                        onChange={(e) => setCurrentDentist({...currentDentist, bio: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, bio: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="website"
                        value={currentDentist.website}
                        id="website"
                        placeholder="website"
                        onChange={(e) => setCurrentDentist({...currentDentist, website: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, website: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="address"
                        value={currentDentist.address}
                        id="address"
                        placeholder="address"
                        onChange={(e) => setCurrentDentist({...currentDentist, address: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, address: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="city"
                        value={currentDentist.city}
                        id="city"
                        placeholder="city"
                        onChange={(e) => setCurrentDentist({...currentDentist, city: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, city: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="street"
                        value={currentDentist.street}
                        id="street"
                        placeholder="street"
                        onChange={(e) => setCurrentDentist({...currentDentist, street: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, street: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="postIndex"
                        value={currentDentist.postIndex}
                        id="postIndex"
                        placeholder="postIndex"
                        onChange={(e) => setCurrentDentist({...currentDentist, postIndex: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, postIndex: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="email"
                        value={currentDentist.email}
                        id="email"
                        placeholder="email"
                        onChange={(e) => setCurrentDentist({...currentDentist, email: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, email: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="lat"
                        value={currentDentist.lat}
                        id="lat"
                        placeholder="lat"
                        onChange={(e) => setCurrentDentist({...currentDentist, lat: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, lat: ''})}/>
                </p>
                <p className="form-login-input">
                    <input
                        type="text"
                        name="lng"
                        value={currentDentist.lng}
                        id="lng"
                        placeholder="lng"
                        onChange={(e) => setCurrentDentist({...currentDentist, lng: e.target.value})}
                    />
                    <Close className="form-login-input-close"
                           onClick={() => setCurrentDentist({...currentDentist, lng: ''})}/>
                </p>
                <p className="form-login-buttons">
                    <button type="submit" className="button-green">Update</button>
                    <button className="button-green" onClick={() => setCurrentDentist(null)}>Cancel Update</button>
                    <button className="button-green" onClick={deleteCurrentDentist}>Delete current Dentist</button>
                </p>
            </form>
        </div>}
        {!dentists && <WrapperFlex><CircularProgress size={120}/></WrapperFlex>}
        <div className="list-dentist">
          {dentists &&
          dentists.map((dentist: any, key: any) => {
            return (
              <CardDentistComponent
                key={key}
                dentist={dentist}
                setCurrentDentist={setFunctCurrentDentist}
              />
            )
          })}
        </div>
      </div>


    </div>
  );
};

export default Login;

