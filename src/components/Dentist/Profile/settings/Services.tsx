import React, { useEffect, useState } from 'react';
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
import ApiManager from '../../../../services/ApiManager';

type Props = {
  route: any
}

const Services: React.FunctionComponent<Props> = ({route}) => {

  const [currentDentist, setCurrentDentist]: any = useState()
  const [serviceName, setServiceName] = useState();

  const [service, setService] = useState([]);
  const [statusSnackbar, setStatusSnackbar] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const disabled = service.length === 0;

  React.useEffect(() => {
    getListServiceForDental();
  }, []);

  useEffect(() => {
    if (route !== undefined) getDentist();
  }, [route]);


  const getDentist = async () => {
    setCurrentDentist(null);
    try {
      await ApiManager.getDentist(route ? route : route.id)
      .then(currentDentist => {
        setCurrentDentist(currentDentist);
      })
    } catch (e) {
      console.log(e)
    }
  }

  const getListServiceForDental = async () => {
    const {data}: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    setService(data.listServiceForDentals.items)
  }

  const addService = async () => {
    const filterService: boolean[] = [];
    if (serviceName && currentDentist) {
      currentDentist.services.items.map((item: any) => {
        if (item.name === serviceName) {
          filterService.push(item)
        }
      });
    }

    if (filterService.length !== 0) {
      setStatusSnackbar('warning');
      setSnackbarMessage(`The service ${serviceName} is already`);
      setOpenSnackbar(true);
      return false;
    }

    await API.graphql({
      query: createService,
      variables: {
        input: {
          name: serviceName,
          dentistId: currentDentist.id
        }
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    })

    getDentist();
    setStatusSnackbar('success');
    setSnackbarMessage(`Service ${serviceName} created`);
    setOpenSnackbar(true);
  }

  const deleteServiceDentist = async (el: any) => {
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
  };

  return (
    <div className="profile-box-form">
      <div className="form-info-block" >
        <div><p className="form-login-title green px20">Services</p>
          <p className="form-login-subtitle gray px12 mb-6px">Information For Patients</p>
        </div>
        { currentDentist && !currentDentist.hasPaidPlan && <p className="form-login-buttons">
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
              <select className="form-profile-input arrows"
                      name="services"
                      id="services"
                      onChange={(event: any) => setServiceName(event.target.value)}
              >
                <option value="" disabled selected>Select Service</option>
                {service.map((item: any, key: any) => (
                  <option key={key} value={item.name}>{item.name}</option>
                ))}
              </select>
            </p>
          </div>
          <p className="row-content">
            <span className='input-span'/>
            <button className="button-green" disabled={disabled} onClick={addService}>Confirm</button>
          </p>
          <div className="mt-big">
            <p className="form-profile-label">
              <label className="form-profile-label">Selected Services</label>
            </p>
            {currentDentist && currentDentist.services.items.map((el: { name: any; id: any; }, key: any) => {
                if (key < 2) {
                  return (
                    <p className="form-login-input" key={key}>
                      <input value={el.name} />
                      <Close className="form-login-input-close" onClick={() => deleteServiceDentist(el)} />
                    </p>
                  )
                }
              })
            }
          </div>
        </div>
        {currentDentist && currentDentist.hasPaidPlan && <div className="profile-block-box">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Additional Services</label>
            </p>
            {currentDentist && currentDentist.hasPaidPlan &&  currentDentist.services.items.map((el: { name: any; id: any; }, key: any) => {
              if (key >= 2) {
                return (
                  <p className="form-profile-empty-input" key={key}>
                    <input type="text" name="empty" value={el.name} id="empty" placeholder="" />
                    <Close className="form-login-input-close" onClick={async () => deleteServiceDentist(el)}/>
                  </p>
                )
              }
            })
            }
          </div>
        </div> }
        {currentDentist && !currentDentist.hasPaidPlan && <div className="profile-block-box disabled">
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

