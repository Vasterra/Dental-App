import React, { useState } from 'react';
import { listServiceForDentals } from 'src/graphql/queries';
import { API } from 'aws-amplify';
import {
  createServiceForDental,
  deleteService,
  deleteServiceForDental,
  updateServiceForDental
} from 'src/graphql/mutations';
import Close from '@material-ui/icons/Close';
import { CircularProgress, Snackbar } from '@material-ui/core';
import ApiManager from '../../services/ApiManager';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Services = () => {

  const [services, setServices]: any = useState();
  const [service, setService]: any = useState();
  const [updateServiceName, setUpdateServiceName]: any = useState();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState('');

  React.useEffect(() => {
    void getListServiceForDentals();
  }, []);


  const getListServiceForDentals = async () => {
    const arr: any = [];
    const { data }: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    data.listServiceForDentals.items.map((item: any) => {
      arr.push(item.name);
    });
    setUpdateServiceName(arr);
    setServices(data.listServiceForDentals.items);
  };

  const addServiceForDental = async () => {
    if (service.length === 0) return false;
    const filterService: boolean[] = [];
    services.map(async (item: any) => {
      if (item.name === service) {
        filterService.push(item);
      }
    });

    if (filterService.length !== 0) {
      setMessageSnackbar(`The service ${service} is already`);
      setSeverity('warning');
      setOpenSnackbar(true);
      return false;
    }
    try {
      await API.graphql({
        query: createServiceForDental,
        variables: {
          input: {
            name: service
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      await getListServiceForDentals();
      setMessageSnackbar(`The service ${service} is add`);
      setSeverity('success');
      setOpenSnackbar(true);
    } catch ({message}) {
      console.log(message);
      throw Error
    }
  };

  const updateService = async (key: any, id: any) => {
    const updateInput: any = document.getElementsByClassName('form-update-input');
    if (updateInput[key].disabled) {
      updateInput[key].disabled = false;
      updateInput[key].style.background = 'white';

    } else {
      updateInput[key].disabled = true;
      updateInput[key].style.background = 'none';
      try {
        await API.graphql({
          query: updateServiceForDental,
          variables: {
            input: {
              id,
              name: updateServiceName[key]
            }
          },
          // @ts-ignore
          authMode: 'AWS_IAM'
        });
        await getListServiceForDentals();
        setMessageSnackbar(`The service ${updateServiceName[key]} is update`);
        setSeverity('success');
        setOpenSnackbar(true);
      } catch ({message}) {
        console.log(message);
        throw Error
      }
    }
  };

  const deleteServiceDental = async (item: any) => {
    await API.graphql({
      query: deleteServiceForDental,
      variables: {
        input: {
          id: item.id
        }
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    void ApiManager.GET_LIST_DENTIST().then((listDentists: any) => {
      listDentists.forEach((dentist: { id: any; }) => {
        void ApiManager.GET_DENTIST(dentist.id).then(dent => {
          dent.services.items.forEach(async (service: any) => {
            if (service.name === item.name) {
              await API.graphql({
                query: deleteService,
                variables: {
                  input: {
                    id: service.id
                  }
                },
                // @ts-ignore
                authMode: 'AWS_IAM'
              });
              setMessageSnackbar(`Service ${service.name} deleted!`);
              setSeverity('success');
              setOpenSnackbar(true);
            }
          });
        });
      });
    });
    await getListServiceForDentals();
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const onChange = (e: any, key: any) => {
    const updateInput: any = document.getElementsByClassName('form-update-input');
    updateInput[key].value = e;
    setUpdateServiceName({ [key]: e });
  };

  return (
    <div className='profile-box-form'>
      {!services && <div className='flex-wrapper'><CircularProgress size={120} /></div>}
      {services &&
      <>
        <div className='form-info-block'>
          <div>
            <p className='form-login-title green px20'>Services Provided</p>
            <p className='form-login-subtitle gray px12 '>Available Service Categories</p>
          </div>
        </div>
        <div className='box-2-box'>
          <div className='profile-block-box'>
            <div>
              <label className='form-profile-label'>Add Service</label>
              <input className='form-profile-input'
                     type='text'
                     name='add_service'
                     id='add_service'
                     value={service}
                     onChange={(e: any) => setService(e.target.value)}
                     placeholder='Service Name Here' />
            </div>
            <p className='row-content'>
              <button className='button-green' onClick={addServiceForDental}>Add service</button>
            </p>
          </div>
          <div className='profile-block-box'>
            <div>
              {services && services.map((item: any, key: any) => {
                return (
                  <div key={key}>
                    <input type='text'
                           className='form-update-input'
                           name='update_service'
                           value={updateServiceName[key]}
                           id='update_service'
                           disabled
                           onChange={(e: any) => onChange(e.target.value, key)} />
                    <span onClick={() => updateService(key, item.id)}>
                    <img className='form-login-input-edit' src='../../../images/edit.svg' />
                  </span>
                    <Close className='form-login-input-close' onClick={() => deleteServiceDental(item)} />
                  </div>
                );
              })
              }
            </div>
          </div>
        </div>
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar}
            // @ts-ignore
                 severity={severity}>
            {messageSnackbar}
          </Alert>
        </Snackbar>
      </>
      }
    </div>
  );
};

export default Services;

