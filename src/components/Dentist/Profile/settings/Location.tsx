import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { API } from 'aws-amplify';
import { createLocation, deleteLocation, updateLocation } from 'src/graphql/mutations';
import ApiManager from '../../../../services/ApiManager';
import Router from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

import styled from 'styled-components';
import { IconClose, IconUpdate } from '../../../../styles/Main.module';

export const FormLoginInput = styled('div')`
  display: flex;
  margin-bottom: 10px;
  position: relative;
  input {
    display: flex;
    width: 100%;
    padding: 10px 65px 10px 10px;
    border: 0;
    background-color: white;
  }
`;

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

type Props = {
  route: any,
  adminSettingSubscriber: any,
  setOpenSnackbar: any,
  setMessageSnackbar: any,
  setSeverity: any,
  changeAddress: any,
}

const Location: React.FunctionComponent<Props> = ({
                                                    route,
                                                    adminSettingSubscriber,
                                                    setOpenSnackbar,
                                                    setMessageSnackbar,
                                                    changeAddress,
                                                    setSeverity
                                                  }) => {

  const [currentDentist, setCurrentDentist] = useState<any | null>(null);
  const [updateDateLocation, setUpdateDateLocation] = useState<any | null>(null);
  const [loaderButtonSubmit, setLoaderButtonSubmit] = useState<any | null>(null);

  useEffect(() => {
    if (route !== undefined) void getDentist();
  }, [route]);


  const getDentist = async () => {
    return await ApiManager.GET_DENTIST(route).then((result: any) => {
      setCurrentDentist(result.data.getDentist);
      setLoaderButtonSubmit(false);
    });
  };

  const handleSubmitUpdate = async (data: any, { setErrors }: any) => {
    // setLoaderButtonSubmit(true);
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
      setUpdateDateLocation(null);
    } catch (err: any) {
      setErrors(err);
    }
    await getDentist();
  };

  const handleSubmit = async (data: any, form: any) => {
    setLoaderButtonSubmit(true);
    if (currentDentist.locations.items.length >= Number(adminSettingSubscriber.freeMaxLocations)) {
      setMessageSnackbar(`A free account allows no more than ${adminSettingSubscriber.freeMaxLocations} locations.`);
      setSeverity('warning');
      setOpenSnackbar(true);
      setLoaderButtonSubmit(false);
      return false;
    }
    if (currentDentist.locations.items.length >= (Number(adminSettingSubscriber.paidMaxLocations) - 1)) {
      setMessageSnackbar(`A paid account allows no more than ${adminSettingSubscriber.paidMaxLocations} locations.`);
      setSeverity('warning');
      setOpenSnackbar(true);
      setLoaderButtonSubmit(false);
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
      form.resetForm();
    } catch (err: any) {
      form.setErrors(err);
    }
    await getDentist();
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
    await getDentist();
  };

  return (
    <div className='profile-box-form'>
      <>
        <div className='form-info-block'>
          <div><p className='form-login-title green px20'>Locations</p>
            <p className='form-login-subtitle gray px12 mb-6px'>Information For Patients</p>
          </div>
          {currentDentist && !currentDentist.hasPaidPlan && <p className='form-login-buttons'>
            <button className='button-green-outline' onClick={() => {
              void Router.push(`../../dentist/account/${currentDentist.id}`);
            }}>Upgrade
            </button>
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
                    postCode: ''
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
                        <span className='input-span' style={{width: '84px'}}>Post Code</span>
                        <input className='form-profile-input'
                               style={{width: '80px'}}
                               name='postCode'
                               placeholder='CB1 2AB'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.postCode === null ? values.postCode = '' : values.postCode}
                        />
                      </p>
                      <p className='row-content'>
                        <span className='input-span' />
                        <button className='button-green' disabled={!values.city || !values.address || !values.postCode}
                                type='submit'>{loaderButtonSubmit ?
                          <FacebookCircularProgress /> : 'Confirm'}
                        </button>
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
                          <button className='button-green'
                                  disabled={!values.city && !values.address && !values.postCode} type='submit'>Update
                          </button>
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
                {currentDentist && currentDentist.locations.items.map((el: any) => {
                  const location = `${el.address} ${el.city} ${el.postCode}`
                  const address = location === null ? '' : location
                  return (
                    <FormLoginInput>
                      <input
                        type='text'
                        value={address === null ? '' : address}
                      />
                      <IconUpdate src='../../../images/edit.svg' alt='edit'
                                  onClick={() => setUpdateDateLocation(el)} />
                      <IconClose src='../../../images/close.svg' alt='close'
                                 onClick={() => handleDelete(el)} />
                    </FormLoginInput>
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
              <FormLoginInput>
                <input
                  type='text'
                  disabled={!currentDentist.hasPaidPlan}
                  value={`${changeAddress !== null ? changeAddress : currentDentist.address}`}
                />
              </FormLoginInput>
              {currentDentist && currentDentist.locations.items.map((el: any) => {
                const location = `${el.address} ${el.city} ${el.postCode}`
                const address = location === null ? '' : location
                return (
                  <FormLoginInput>
                    <input
                      type='text'
                      value={address === null ? '' : address}
                    />
                    <IconUpdate src='../../../images/edit.svg' alt='edit'
                                onClick={() => setUpdateDateLocation(el)} />
                    <IconClose src='../../../images/close.svg' alt='close'
                               onClick={() => handleDelete(el)} />
                  </FormLoginInput>
                );
              })
              }
            </div>
          </div>}
        </div>
      </>
    </div>
  );
};

export default Location;
