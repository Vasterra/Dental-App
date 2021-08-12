import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Close from '@material-ui/icons/Close';
import { API } from 'aws-amplify';
import { createLocation, deleteLocation, updateLocation } from 'src/graphql/mutations';
import ApiManager from '../../../../services/ApiManager';
import Router from 'next/router';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

type Props = {
  route: any,
  adminSettingSubscriber: any,
}

const Location: React.FunctionComponent<Props> = ({ route, adminSettingSubscriber }) => {

  const [updateDateLocation, setUpdateDateLocation]: any = useState();
  const [currentDentist, setСurrentDentist]: any = useState();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if (route !== undefined) getDentist(route);
  }, [route]);


  const getDentist = async (id: string) => {
    setСurrentDentist(null);
    try {
      await ApiManager.getDentist(id)
      .then(currentDentist => {
        setСurrentDentist(currentDentist);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitUpdate = async (data: any, { setErrors }: any) => {
    setUpdateDateLocation(null);
    try {
      await API.graphql({
        query: updateLocation,
        variables: {
          input: {
            id: data.id,
            city: data.city,
            address: data.address,
            postCode: data.postCode,
            dentistId: currentDentist.id
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
    } catch (err) {
      setErrors(err);
    }
    getDentist(route);
  };

  const handleSubmit = async (data: any, form: any) => {
    console.log(currentDentist.locations.items);
    if (currentDentist.locations.items.length === Number(adminSettingSubscriber.freeMaxLocations)) {
      setMessageSnackbar(`A free account allows no more than ${adminSettingSubscriber.freeMaxLocations} locations.`);
      setSeverity('warning');
      setOpenSnackbar(true);
      return false;
    }

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
      });
      setMessageSnackbar(`The location ${data.city} ${data.address} ${data.postCode} is already`);
      setSeverity('success');
      setOpenSnackbar(true);
      form.resetForm()
    } catch (err) {
      form.setErrors(err);
    }
    getDentist(route);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDelete = async (el: any) => {
    await API.graphql({
      query: deleteLocation,
      variables: {
        input: {
          id: el.id
        }
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    setMessageSnackbar(`The location ${el.city} ${el.address} ${el.postCode} is delete`);
    setSeverity('success');
    setOpenSnackbar(true);
    getDentist(route);
  };

  return (
    <div className='profile-box-form'>
      <>
        <div className='form-info-block'>
          <div><p className='form-login-title green px20'>Locations</p>
            <p className='form-login-subtitle gray px12 mb-6px'>Information For Patients</p>
          </div>
          {currentDentist && !currentDentist.hasPaidPlan && <p className='form-login-buttons'>
            <button className='button-green-outline' onClick={() => {void Router.push(`../../dentist/account/${currentDentist.id}`)}}>Upgrade</button>
          </p>}
        </div>
        <div className='box-2-box'>
          <div className='profile-block-box'>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label'>Add Location</label>
              </p>
              {
                <Formik
                  validateOnBlur={true}
                  validateOnChange={true}
                  onSubmit={handleSubmit}
                  initialValues={{
                    city: '',
                    address: '',
                    postCode: '',
                  }}
                >
                  {({
                      values,
                      handleSubmit,
                      handleChange,
                      handleBlur
                    }) => (
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                      <p className='row-content'>
                        <span className='input-span'>Town/City</span>
                        <input className='form-profile-input'
                               name='city'
                               placeholder='Cambridge'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.city === null ? values.city = '' : values.city}
                        />
                      </p>
                      <p className='row-content'>
                        <span className='input-span'>Address</span>
                        <input className='form-profile-input'
                               name='address'
                               placeholder='Cambridge'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.address === null ? values.address = '' : values.address}
                        />
                      </p>
                      <p className='row-content'>
                        <span className='input-span'>Post Code</span>
                        <input className='form-profile-input'
                               name='postCode'
                               placeholder='CB1 2AB'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.postCode === null ? values.postCode = '' : values.postCode}
                        />
                      </p>
                      <p className='row-content'>
                        <span className='input-span' />
                        <button className='button-green' disabled={!values.city || !values.address || !values.postCode} type='submit'>Confirm</button>
                      </p>
                    </form>
                  )}
                </Formik>
              }
            </div>
          </div>
          {currentDentist && currentDentist.hasPaidPlan && <>
            {updateDateLocation && <div className='profile-block-box'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Update Location</label>
                </p>
                {
                  <Formik
                    validateOnBlur={true}
                    validateOnChange={true}
                    onSubmit={handleSubmitUpdate}
                    initialValues={updateDateLocation}
                  >
                    {({
                        values,
                        handleSubmit,
                        handleChange,
                        handleBlur
                      }) => (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }} style={{ width: '100%' }}>
                        <p className='row-content'>
                          <span className='input-span'>Town/City</span>
                          <input className='form-profile-input'
                                 name='city'
                                 placeholder='Cambridge'
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.city === null ? values.city = '' : values.city}
                          />
                        </p>
                        <p className='row-content'>
                          <span className='input-span'>Address</span>
                          <input className='form-profile-input'
                                 name='address'
                                 placeholder='Cambridge'
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.address === null ? values.address = '' : values.address}
                          />
                        </p>
                        <p className='row-content'>
                          <span className='input-span'>Post Code</span>
                          <input className='form-profile-input'
                                 name='postCode'
                                 placeholder='CB1 2AB'
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.postCode === null ? values.postCode = '' : values.postCode}
                          />
                        </p>
                        <p className='row-content'>
                          <span className='input-span' />
                          <button className='button-green' disabled={!values.city && !values.address && !values.postCode} type='submit'>Update</button>
                          <button className='button-green' onClick={() => setUpdateDateLocation(null)}>Cancel</button>
                        </p>
                      </form>
                    )}
                  </Formik>
                }
              </div>
            </div>}
            {!updateDateLocation && <div className='profile-block-box'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Additional Locations</label>
                </p>
                {currentDentist && currentDentist.locations.items.map((el: any, key: any) => {
                  return (
                    <p className='form-login-input' key={key}>
                      <input
                        type='text'
                        className='form-update-input'
                        value={el.city + ' ' + el.address + ' ' + el.postCode}
                        disabled
                      />
                      <span onClick={() => setUpdateDateLocation(el)}>
                        <img className='form-login-input-edit' src='../../../images/edit.svg'  alt="edit" />
                      </span>
                      <Close className='form-login-input-close' onClick={() => handleDelete(el)} />
                    </p>
                  );
                })
                }
              </div>
            </div>}
          </>}
          {currentDentist && !currentDentist.hasPaidPlan && <div className='profile-block-box disabled'>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label'>Locations</label>
              </p>
              {
                adminSettingSubscriber && currentDentist.locations.items.map((el: any, key: any) => {
                  if (key < Number(currentDentist.hasPaidPlan ? adminSettingSubscriber.paidMaxLocations : adminSettingSubscriber.freeMaxLocations)) {
                    return (
                      <p className='form-login-input' key={key}>
                        <input value={`${el.city} ${el.address} ${el.postCode}`} />
                      </p>
                    );
                  }
                })
              }
            </div>
          </div>}
        </div>
      </>
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

export default Location;
