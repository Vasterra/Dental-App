import React, { useState } from 'react';
import { listServiceForDentals } from 'src/graphql/queries';
import { API } from 'aws-amplify';
import { createServiceForDental, deleteServiceForDental, updateServiceForDental } from 'src/graphql/mutations';
import Close from '@material-ui/icons/Close';
import { CircularProgress } from '@material-ui/core';


const Services = () => {

  const [services, setServices]: any = useState();
  const [service, setService]: any = useState();
  const [updateServiceName, setUpdateServiceName]: any = useState();

  React.useEffect(() => {
    getListServiceForDentals();
  }, []);


  const getListServiceForDentals = async () => {
    const arr: any[] = [];
    setServices(null);
    const { data }: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    data.listServiceForDentals.items.map((item: any, key: any) => {
      arr.push(item.name);
    });
    setUpdateServiceName(arr);
    setServices(data.listServiceForDentals.items);
  };

  const addServiceForDentals = async () => {
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
    getListServiceForDentals();
  };

  const updateServiceForDentals = async (key: any, id: any) => {
    const updateInput: any = document.getElementsByClassName('form-update-input');
    if (updateInput[key].disabled) {
      updateInput[key].disabled = false;
      updateInput[key].style.background = 'white';

    } else {
      updateInput[key].disabled = true;
      updateInput[key].style.background = 'none';
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
      getListServiceForDentals();
    }
  };

  const deleteService = async (item: { id: any; }) => {
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
    getListServiceForDentals();
  };

  const onChnage = (e: any, key: any) => {
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
              <p className='form-profile-label'>
                <label className='form-profile-label'>Add Service</label>
              </p>
              <p>
                <input className='form-profile-input'
                       type='text'
                       name='add_service'
                       id='add_service'
                       value={service}
                       onChange={(e: any) => setService(e.target.value)}
                       placeholder='Service Name Here' />
              </p>
            </div>
            <p className='row-content'>
              <button className='button-green' onClick={addServiceForDentals}>Add service</button>
            </p>
          </div>
          <div className='profile-block-box'>
            <div>
              {services.map((item: any, key: any) => {
                return (
                  <div key={key}>
                    <input type='text'
                           className='form-update-input'
                           name='update_service'
                           value={updateServiceName[key]}
                           id='update_service'
                           disabled
                           onChange={(e: any) => onChnage(e.target.value, key)} />
                    <span onClick={() => updateServiceForDentals(key, item.id)}>
                    <img className='form-login-input-edit' src='../../../images/edit.svg' />
                  </span>
                    <Close className='form-login-input-close' onClick={() => deleteService(item)} />
                  </div>
                );
              })
              }
            </div>
          </div>
        </div>
      </>
      }
    </div>
  );
};

export default Services;

