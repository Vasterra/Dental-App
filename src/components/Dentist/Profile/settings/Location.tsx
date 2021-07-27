import React, {useState} from "react";
import {Formik} from "formik";
import {
  Chip,
  createStyles,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  useTheme
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import {API} from "aws-amplify";

import DentistProfileInput from "src/components/Dentist/Profile/componentForm/Input";
import DentistProfileArea from "src/components/Dentist/Profile/componentForm/TextArea";

import {BlockWrapperGreen} from "src/styles/Main.module";
import {ButtonBigGreen} from "src/styles/Button.module";
import {ButtonSubmitWrapper, Label} from "src/styles/Form.module";

import {listLocations} from "src/graphql/queries";
import {createLocation, deleteLocation} from "src/graphql/mutations";

type Props = {
  currentDentist: any,
  getDentist: Function,
}

const Location: React.FunctionComponent<Props> = ({currentDentist, getDentist}) => {

  const [dataLocation, setDataLocation] = useState({
    city: '',
    address: '',
    postCode: '',
  });
  const [location, setLocation] = useState([]);
  const [isDisabled, setIsDsabled] = useState(false);

  const disabled = location.length === 0;

  React.useEffect(() => {
    getLocations()
  }, []);

  const getLocation = () => {
    setDataLocation(currentDentist.location.items.map((item: any) => item))
  }

  const getLocations = async () => {
    const {data}: any = await API.graphql({
      query: listLocations,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    setLocation(data.listLocations.items)
  }

  return (
    <div className="profile-box-form">
      <div className="form-info-block" >
        <div><p className="form-login-title green px20">Locations</p>
          <p className="form-login-subtitle gray px12 mb-6px">Information For Patients</p>
        </div>
        { !currentDentist.hasPaidPlan && <p className="form-login-buttons">
          <button className="button-green-outline">Upgrade</button>
        </p> }
      </div>
      <div className="box-2-box">
        <div className="profile-block-box">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Add Location</label>
            </p>
            {
              <Formik
                validateOnBlur={true}
                validateOnChange={true}
                onSubmit={async (data: any, {setErrors}) => {
                  setIsDsabled(true)
                  try {
                    await API.graphql({
                      query: createLocation,
                      variables: {
                        input: {
                          city: data.city,
                          address: data.address,
                          postCode: data.postCode,
                          dentistId: currentDentist.id
                        }
                      },
                      // @ts-ignore
                      authMode: 'AWS_IAM'
                    })
                  } catch (err) {
                    setErrors(err);
                  }
                  getDentist();
                  setIsDsabled(false)
                }}
                initialValues={dataLocation}
              >
                {props => (
                  <form onSubmit={props.handleSubmit} style={{width: '100%'}}>
                    <p className="row-content">
                      <span className="input-span">Town/City</span>
                      <input className="form-profile-input"
                             name="city"
                             placeholder="Cambridge"
                             onChange={props.handleChange}
                             onBlur={props.handleBlur}
                             value={props.values.city === null ? props.values.city = '' : props.values.city}
                      />
                    </p>
                    <p className="row-content">
                      <span className="input-span">Address</span>
                      <input className="form-profile-input"
                             name="address"
                             placeholder="Cambridge"
                             onChange={props.handleChange}
                             onBlur={props.handleBlur}
                             value={props.values.address === null ? props.values.address = '' : props.values.address}
                      />
                    </p>
                    <p className="row-content">
                      <span className="input-span">Post Code</span>
                      <input className="form-profile-input"
                             name="postCode"
                             placeholder="CB1 2AB"
                             onChange={props.handleChange}
                             onBlur={props.handleBlur}
                             value={props.values.postCode === null ? props.values.postCode = '' : props.values.postCode}
                      />
                    </p>
                    <p className="row-content">
                      <span className="input-span"></span>
                      <button className="button-green" disabled={isDisabled} type="submit">Confirm</button>
                    </p>
                  </form>
                )}
              </Formik>
            }
          </div>
        </div>
        { currentDentist.hasPaidPlan && <div className="profile-block-box">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Additional Locations</label>
            </p>
            {
              currentDentist.locations.items.map((el: any, key: any) => {
                return (
                  <p className="form-login-input" key={key}>
                    <input value={el.city + ' ' + el.address + ' ' + el.postCode}/>
                    <Close className="form-login-input-close" onClick={async () => {
                      await API.graphql({
                        query: deleteLocation,
                        variables: {
                          input: {
                            id: el.id
                          }
                        },
                        // @ts-ignore
                        authMode: 'AWS_IAM'
                      })
                      getDentist();
                    }}/>
                  </p>
                )
              })
            }
          </div>
        </div> }
        { !currentDentist.hasPaidPlan && <div className="profile-block-box disabled">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Locations</label>
            </p>
            {
              currentDentist.locations.items.map((el: any, key: any) => {
                return (
                  <p className="form-login-input" key={key}>
                    <input value={el.city + ' ' + el.address + ' ' + el.postCode}/>
                  </p>
                )
              })
            }
          </div>
        </div> }
      </div>
    </div>
  )
}

export default Location
