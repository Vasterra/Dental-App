import React, { useState } from "react";
import {Formik} from "formik";
import {API} from "aws-amplify";
import {
  Chip,
  createStyles,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  Theme,
  useTheme
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Close from "@material-ui/icons/Close";

import DentistProfileInput from "src/components/Dentist/Profile/componentForm/Input";
import DentistProfileArea from "src/components/Dentist/Profile/componentForm/TextArea";

import {BlockWrapperGreen} from "src/styles/Main.module";
import {ButtonBigGreen} from "src/styles/Button.module";
import {ButtonSubmitWrapper, Label} from "src/styles/Form.module";

import {createService, deleteService, updateDentist} from "src/graphql/mutations";
import { listServiceForDentals } from "src/graphql/queries";

type Props = {
  currentDentist: any,
  getDentist: Function,
}

const Services: React.FunctionComponent<Props> = ({currentDentist, getDentist}) => {
  const [personName, setPersonName] = useState([]);
  const [service, setService] = useState([]);
  const [statusSnackbar, setStatusSnackbar] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const disabled = service.length === 0;

  React.useEffect(() => {
    getListServiceForDentals()
  }, []);

  const getServices = () => {
    setPersonName(currentDentist.services.items.map((item: { name: any; }) => item.name))
  }

  const handleOnChange = async (event: { target: { value: React.SetStateAction<never[]>; }; }) => {
    setPersonName(event.target.value);
  };

  const getListServiceForDentals = async () => {
    const {data}: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    setService(data.listServiceForDentals.items)
  }

  return (
    <div className="profile-box-form">
      <div className="form-info-block" >
        <div><p className="form-login-title green px20">Services</p>
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
              <label className="form-profile-label">Add Service</label>
            </p>
            <p className="row-content">
              <span className="input-span">Service</span>
              <select className="form-profile-input arrows" name="services" id="services"
                      // @ts-ignore
                      onChange={handleOnChange}>
                <option value="" disabled selected>Select Service</option>
                {service.map((item: any, key: any) => (
                  <option key={key} value={item.name}>{item.name}</option>
                ))}
              </select>
            </p>
          </div>
          <p className="row-content">
            <span className="input-span"></span>
            <button className="button-green" disabled={disabled} onClick={async () => {

              if (personName.length === 0) return false;
              const filterService: boolean[] = [];
              currentDentist.services.items.map(async (item: any) => {
                if (item.name === personName) { filterService.push(item) }
              });

              if (filterService.length !== 0) {
                setStatusSnackbar('warning');
                setSnackbarMessage(`The service ${personName} is already`);
                setOpenSnackbar(true);
                return false;
              }

              await API.graphql({
                query: createService,
                variables: {
                  input: {
                    name: personName,
                    dentistId: currentDentist.id
                  }
                },
                // @ts-ignore
                authMode: 'AWS_IAM'
              })
              getDentist();
              setStatusSnackbar('success');
              setSnackbarMessage(`Service ${personName} created`);
              setOpenSnackbar(true);
            }}>Confirm</button>
          </p>
          <div className="mt-big">
            <p className="form-profile-label">
              <label className="form-profile-label">Selected Services</label>
            </p>
            {
              currentDentist.services.items.map((el: { name: any; id: any; }, key: any) => {
                if (key < 2) {
                  return (
                    <p className="form-login-input" key={key}>
                      <input value={el.name} />
                      <Close className="form-login-input-close" onClick={async () => {
                        await API.graphql({
                          query: deleteService,
                          variables: {
                            input: {
                              id: el.id
                            }
                          },
                          // @ts-ignore
                          authMode: 'AWS_IAM'
                        })
                        getDentist();
                        setStatusSnackbar('success');
                        setSnackbarMessage(`Service ${el.name} deleted`);
                        setOpenSnackbar(true);
                      }}/>
                    </p>
                  )
                }
              })
            }
          </div>
        </div>
        { currentDentist.hasPaidPlan && <div className="profile-block-box">
          <div>

            <p className="form-profile-label">
              <label className="form-profile-label">Additional Services</label>
            </p>
            { currentDentist.hasPaidPlan &&  currentDentist.services.items.map((el: { name: any; id: any; }, key: any) => {
                if (key >= 2) {
                  return (
                    <p className="form-profile-empty-input" key={key}>
                      <input type="text" name="empty" value={el.name} id="empty" placeholder="" />
                      <Close className="form-login-input-close" onClick={async () => {
                        await API.graphql({
                          query: deleteService,
                          variables: {
                            input: {
                              id: el.id
                            }
                          },
                          // @ts-ignore
                          authMode: 'AWS_IAM'
                        })
                        getDentist();
                        setStatusSnackbar('success');
                        setSnackbarMessage(`Service ${el.name} deleted`);
                        setOpenSnackbar(true);
                      }}/>
                    </p>
                  )
                }
              })
            }
          </div>
        </div> }
        { !currentDentist.hasPaidPlan && <div className="profile-block-box disabled">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Additional Services - Premium</label>
            </p>
            <p className="form-profile-empty-input">
              <input type="text" name="empty" value="" id="empty" placeholder="" disabled />
            </p>
            <p className="form-profile-empty-input">
              <input type="text" name="empty" value="" id="empty" placeholder="" disabled />
            </p>
            <p className="form-profile-empty-input">
              <input type="text" name="empty" value="" id="empty" placeholder="" disabled />
            </p>
            <p className="form-profile-empty-input">
              <input type="text" name="empty" value="" id="empty" placeholder="" disabled />
            </p>
            <p className="form-profile-empty-input">
              <input type="text" name="empty" value="" id="empty" placeholder="" disabled />
            </p>
            <p className="form-profile-empty-input">
              <input type="text" name="empty" value="" id="empty" placeholder="" disabled />
            </p>
          </div>

        </div> }
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={2000}
      >
        <Alert
          variant="filled"
          // @ts-ignore
          severity={statusSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>

  )
}

export default Services;
