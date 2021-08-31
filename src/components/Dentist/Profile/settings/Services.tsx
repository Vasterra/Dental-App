import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { createService, deleteService } from 'src/graphql/mutations';
import ApiManager from '../../../../services/ApiManager';
import Router from 'next/router';
import styled from 'styled-components';

export const FormLoginInput = styled('div')`
  display: flex;
  margin-bottom: 10px;
  position: relative;
  input {
    display: flex;
    width: 100%;
    padding: 10px 35px 10px 10px;
    border: 0;
    background-color: white;
  }
`;

export const IconClose = styled("img")`
  cursor: pointer;
  transition: 0.3s linear;
  position: relative;
  right: 30px;
  :hover {
    transform: rotate(90deg);
  }
`;

type Props = {
  route: any,
  adminSettingSubscriber: any,
  setOpenSnackbar: any,
  setMessageSnackbar: any,
  setSeverity: any,
}

const Services: React.FunctionComponent<Props> = ({
                                                    route,
                                                    adminSettingSubscriber,
                                                    setOpenSnackbar,
                                                    setMessageSnackbar,
                                                    setSeverity
                                                  }) => {

  const [currentDentist, setCurrentDentist] = useState<any | null>(null);
  const [serviceName, setServiceName] = useState();
  const [service, setService] = useState([]);

  React.useEffect(() => {
    void ApiManager.GET_LIST_FOR_DENTAL().then((result: any) => {
      setService(result.data.listServiceForDentals.items);
    });
  }, []);

  useEffect(() => {
    if (route !== undefined) getDentist();
  }, [route]);

  const getDentist = () => {
    setCurrentDentist(null);
    try {
      void ApiManager.getDentist(route ? route : route.id)
      .then(result => {
        setCurrentDentist(result);
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const addService = async () => {
    const filterService: boolean[] = [];
    if (serviceName && currentDentist) {
      currentDentist.services.items.map((item: any) => {
        if (item.name === serviceName) {
          filterService.push(item);
        }
      });
    }

    if (!currentDentist.hasPaidPlan) {
      if (currentDentist.services.items.length === Number(adminSettingSubscriber.freeMaxServices)) {
        setMessageSnackbar(`A free account allows no more than ${adminSettingSubscriber.freeMaxServices} services.`);
        setSeverity('warning');
        setOpenSnackbar(true);
        return false;
      }
    }

    if (filterService.length !== 0) {
      setMessageSnackbar(`The service ${serviceName} is already`);
      setSeverity('warning');
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
    });

    getDentist();
    setMessageSnackbar(`Service ${serviceName} created`);
    setSeverity('success');
    setOpenSnackbar(true);
  };

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
    });
    getDentist();
    setMessageSnackbar(`Service ${el.name} deleted`);
    setSeverity('success');
    setOpenSnackbar(true);
  };

  return (
    <div className='profile-box-form'>
      <div className='form-info-block'>
        <div>
          <p className='form-login-title green px20'>Services</p>
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
              <label className='form-profile-label'>Add Service</label>
            </p>
            <p className='row-content'>
              <span className='input-span'>Service</span>
              <select className='form-profile-input arrows'
                      name='services'
                      id='services'
                      onChange={(event: any) => setServiceName(event.target.value)}
              >
                <option value='' disabled selected>Select Service</option>
                {service.map((item: any, key: any) => (
                  <option key={key} value={item.name}>{item.name}</option>
                ))}
              </select>
            </p>
          </div>
          <p className='row-content'>
            <span className='input-span' />
            <button className='button-green' disabled={!serviceName} onClick={addService}>Confirm</button>
          </p>
          <div className='mt-big'>
            <p className='form-profile-label'>
              <label className='form-profile-label'>Selected Services</label>
            </p>
            {currentDentist && adminSettingSubscriber && currentDentist.services.items.map((el: { name: any; id: any; }, key: any) => {
              if (key < Number(adminSettingSubscriber.freeMaxServices)) {
                return (
                  <FormLoginInput key={key}>
                    <input type='text' value={el.name} />
                    <IconClose src='../../../images/close.svg' alt='close' onClick={() => deleteServiceDentist(el)} />
                  </FormLoginInput>
                );
              }
            })
            }
          </div>
        </div>
        {currentDentist && currentDentist.hasPaidPlan && <div className='profile-block-box'>
          <div>
            <p className='form-profile-label'>
              <label className='form-profile-label'>Additional Services</label>
            </p>
            {currentDentist && currentDentist.hasPaidPlan && currentDentist.services.items.map((el: { name: any; id: any; }, key: any) => {
              if (key < Number(adminSettingSubscriber.paidMaxServices)) {
                return (
                  <FormLoginInput key={key}>
                    <input type='text' value={el.name} />
                    <IconClose src='../../../images/close.svg' alt='close' onClick={() => deleteServiceDentist(el)} />
                  </FormLoginInput>
                );
              }
            })
            }
          </div>
        </div>}
        {currentDentist && !currentDentist.hasPaidPlan && <div className='profile-block-box disabled'>
          <div>
            <p className='form-profile-label'>
              <label className='form-profile-label'>Additional Services - Premium</label>
            </p>
            <p className='form-profile-empty-input'>
              <input type='text' name='empty' value='' id='empty' placeholder='' disabled />
            </p>
            <p className='form-profile-empty-input'>
              <input type='text' name='empty' value='' id='empty' placeholder='' disabled />
            </p>
            <p className='form-profile-empty-input'>
              <input type='text' name='empty' value='' id='empty' placeholder='' disabled />
            </p>
            <p className='form-profile-empty-input'>
              <input type='text' name='empty' value='' id='empty' placeholder='' disabled />
            </p>
            <p className='form-profile-empty-input'>
              <input type='text' name='empty' value='' id='empty' placeholder='' disabled />
            </p>
            <p className='form-profile-empty-input'>
              <input type='text' name='empty' value='' id='empty' placeholder='' disabled />
            </p>
          </div>
        </div>}
      </div>
    </div>

  );
};

export default Services;

