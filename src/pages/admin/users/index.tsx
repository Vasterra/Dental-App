import React, { useEffect, useState } from 'react';
import Menu from 'src/components/menu';
import moment from 'moment';
import { motion } from 'framer-motion';
import { API, Auth } from 'aws-amplify';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Pagination } from '@material-ui/lab';
import { UserViewProfileBlock, UserViewProfileLink } from 'src/styles/PageUsers.module';
import { CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ButtonRedOutline } from 'src/styles/Buttons.module';
import ApiManager from 'src/services/ApiManager';
import { deleteDentist, updateDentist } from '../../../graphql/mutations';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const AdminUsers = () => {

  const articlesOnPage = 10;

  const [dentists, setDentists]: any = useState();
  const [oldDentists, setOldDentists]: any = useState();
  const [userInfoShow, setUserInfoShow]: any = useState(false);
  const [countPagination, setCountPagination]: any = useState();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openSuspend, setOpenSuspend] = React.useState(false);
  const [deleteAccount, setDeleteAccount] = useState('');
  const [suspendAccount, setSuspendAccount] = useState('');
  const [accountToDelete, setAccountToDelete]: any = useState();
  const [groupName, setGroupName] = useState();
  const [gdcNumber, setGdcNumber] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState('');

  const variants = {
    visible: { opacity: 1, height: 'auto' },
    hidden: { opacity: 0, height: 0 }
  };

  useEffect(() => {
    void listUsersGroupDental();
  }, []);

  const changeSearch = (e: any) => {
    const allDentists: any[] = [];
    oldDentists.forEach((dentist: { email: string; }) => {
      console.log(dentist);
      if (dentist.email.toLowerCase().indexOf(e) === 0) {
        allDentists.push(dentist);
      }
    });
    setDentists(allDentists);
  };

  const clickRowOpen = (id: number) => {
    const allRow: any = document.getElementsByClassName('user-info');
    for (let i = 0; i < allRow.length; i++) {
      allRow[i].style.display = 'none';
    }
    if (allRow[id].style.display === 'none') {
      allRow[id].style.display = 'block';
      setUserInfoShow(true);
    } else {
      allRow[id].style.display = 'none';
      setUserInfoShow(false);
    }
  };

  const getDate = (dentist: { UserCreateDate: string | number | Date; }) => {
    const resultDate = new Date(dentist.UserCreateDate);
    const month = resultDate.getMonth() + 1;
    return `${resultDate.getDate() < 10 ? '0' + resultDate.getDate() : resultDate.getDate()}.${month < 10 ? '0' + month : month}.${resultDate.getFullYear()}`;
  };

  const getFullDate = (dentist: { UserLastModifiedDate: string | number | Date; }) => {
    const resultDate = new Date(dentist.UserLastModifiedDate);
    const month = resultDate.getMonth() + 1;
    return `${resultDate.getDate() < 10 ? '0' + resultDate.getDate() : resultDate.getDate()}.${month < 10 ? '0' + month : month}.${resultDate.getFullYear()} - ${resultDate.getHours() < 10 ? '0' + resultDate.getHours() : resultDate.getHours()}:${resultDate.getMinutes() < 10 ? '0' + resultDate.getMinutes() : resultDate.getMinutes()}`;
  };

  const filterDate = (filter: any) => {
    const currentDate = moment();
    let filteredDentists;
    if (filter === 'Last Week') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'week'));
    } else if (filter === 'Last Month') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month'));
    } else if (filter === 'Last 3 Months') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).subtract(3, 'month'));
    } else if (filter === 'Last 6 Months') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).subtract(6, 'month'));
    } else if (filter === 'Last Year') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'year'));
    }
    setDentists(filteredDentists);
  };

  const filterStatus = (status: any) => {
    let filteredDentists;
    if (status === 'Paid') {
      filteredDentists = oldDentists.filter((item: any) => item.hasPaidPlan === true);
    } else {
      filteredDentists = oldDentists.filter((item: any) => item.hasPaidPlan !== true);
    }
    setDentists(filteredDentists);
  };

  const changePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    const startFrom = (value - 1) * articlesOnPage;
    const data = oldDentists.slice(startFrom, startFrom + articlesOnPage);
    setDentists(data);
  };

  const handleClickOpen = (account: any, groupname: any, open: any) => {
    setAccountToDelete(account);
    setGroupName(groupname);
    open === 'delete' ? setOpenDelete(true) : setOpenSuspend(true);
  };

  const handleClose = (open: any) => {
    open === 'delete' ? setOpenDelete(false) : setOpenSuspend(false);
  };

  const listUsersGroupCancelDental = async (groupDental: any) => {
    const apiName = 'AdminQueries';
    const path = '/listUsersInGroup';
    const myInit = {
      queryStringParameters: {
        groupname: 'CancelDental'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`
      }
    };
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    try {
      void await getListUser(groupDental, rest.Users);
    } catch (error) {
      console.error('There as an Error', error);
    }
  };

  const listUsersGroupDental = async () => {
    const apiName = 'AdminQueries';
    const path = '/listUsersInGroup';
    const myInit = {
      queryStringParameters: {
        groupname: 'Dentists'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`
      }
    };
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    try {
      void await listUsersGroupCancelDental(rest.Users);
    } catch (error) {
      console.error('There as an Error', error);
    }
  };

  async function getListUser(groupDental: string | any[], groupCancelDental: any) {
    const apiName = 'AdminQueries';
    const path = '/listUsers';
    const myInit = {
      queryStringParameters: {
        groupname: 'Admins'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    };
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    try {
      const mergeGroup: any = groupDental.concat(groupCancelDental);
      try {
        ApiManager.getListDentists().then(listDentists => {
          const arr: any[] = [];
          console.log(listDentists);
          console.log(mergeGroup);
          mergeGroup.forEach((item: any, key: any) => {
            const arr2 = {
              email: '',
              gdcNumber: '',
              postCode: '',
              subscription: '',
              hasPaidPlan: false,
              suspend: false
            };
            item.Attributes.forEach((val: any) => {
              val.Name === 'email' ? arr2.email = val.Value : '';
              item.Username === listDentists[key].id ? arr2.gdcNumber = listDentists[key].gdcNumber : '';
              val.Name === 'custom:postCode' ? arr2.postCode = val.Value : '';
              val.Name === 'custom:subscription' ? arr2.subscription = val.Value : '';
              val.Name === 'custom:hasPaidPlan' ? arr2.hasPaidPlan = val.Value : false;
              val.Name === 'custom:suspend' ? arr2.suspend = val.Value : false;
            });
            arr.push({
              ...item,
              ...arr2
            });
          });
          setCountPagination(Math.ceil(arr.length / articlesOnPage));
          setDentists(arr);
          setOldDentists(arr);
          setGdcNumber('');
          downloadCSV(arr)
        });
      } catch (e) {
        console.log(e);
      }
      return rest;
    } catch (error) {
      console.error('There as an Error', error);
    }
  }

  function downloadCSV(csv: any[] | BlobPart) {
    let csvFile;
    csvFile = new Blob([csv], {type:"text/csv"});
    const csvDownload = document.getElementById('csv-download')
    csvDownload.download = 'Users.csv';
    csvDownload.href = window.URL.createObjectURL(csvFile);
  }

  async function addUserToGroup() {
    const apiName = 'AdminQueries';
    const path = '/addUserToGroup';
    const myInit = {
      body: {
        groupname: groupName,
        username: accountToDelete.Username
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    };
    await API.post(apiName, path, myInit);
    if (groupName === 'Dentists') {
      void await removeUserFromGroup('CancelDental');
      void await enableUser();
    } else {
      void await removeUserFromGroup('Dentists');
      void await disableUser();
    }
  }

  async function removeUserFromGroup(group: string) {
    const apiName = 'AdminQueries';
    const path = '/removeUserFromGroup';
    const myInit = {
      body: {
        groupname: group,
        username: accountToDelete.Username
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    };
    await API.post(apiName, path, myInit);
  }

  async function disableUser() {
    const apiName = 'AdminQueries';
    const path = '/disableUser';
    const myInit = {
      body: {
        username: accountToDelete.Username
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    };
    await API.post(apiName, path, myInit);
    void await listUsersGroupDental();
  }

  async function enableUser() {
    const apiName = 'AdminQueries';
    const path = '/enableUser';
    const myInit = {
      body: {
        username: accountToDelete.Username
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    };
    await API.post(apiName, path, myInit);
    void await listUsersGroupDental();
  }

  const onRemoveAccount = async () => {
    if (deleteAccount.toUpperCase() === 'DELETE') {
      handleClose('delete');
      await API.graphql({
        query: deleteDentist,
        variables: {
          input: {
            id: accountToDelete.Username
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      await ApiManager.CREATE_CLOSED_ACCOUNT(accountToDelete.Username);
      await addUserToGroup();
    }
  };

  const onSuspendAccount = async () => {
    if (suspendAccount.toUpperCase() === 'SUSPEND') {
      handleClose('suspend');
      await addUserToGroup();
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const updateGdsNumber = async (key: any, dentist: any) => {
    const updateInput: any = document.getElementsByClassName('gdc-update-input');
    if (updateInput[key].disabled) {
      updateInput[key].disabled = false;
      updateInput[key].style.background = 'var(--color-white)';
      updateInput[key].style.color = 'var(--color-black)';
      updateInput[key].style.borderBottom = 'none';
    } else {
      updateInput[key].disabled = true;
      updateInput[key].style.background = 'var(--color-green)';
      updateInput[key].style.color = 'var(--color-white)';
      updateInput[key].style.borderBottom = 'none';
      if (gdcNumber.length !== 0) {
        await API.graphql({
          query: updateDentist,
          variables: {
            input: {
              id: dentist.Username,
              gdcNumber
            }
          },
          // @ts-ignore
          authMode: 'AWS_IAM'
        });
        await listUsersGroupDental();
      }
    }
  };

  return (
    <section className='container-profile'>
      <Menu active='Users' />
      <div className='main-profile bg-white '>
        <div className='profile-box-form'>
          <div className='form-info-block'>
            <div>
              <p className='form-login-title green px20'>Users Catalogue</p>
              <p className='form-login-subtitle gray px12 mb-6px'>Search Users</p>
            </div>
          </div>
          <div className='search'>
            <input className='search-users'
                   type='search'
                   id='search'
                   name='search'
                   onChange={e => changeSearch(e.target.value)}
                   placeholder='Search users' />
            <img className='search-button' src='../../../images/search.svg' alt='search' />
          </div>
          <div className='user-list-header'>
            <div className='form-profile-label'>Dentist</div>
            <div className='form-profile-label select-area' id='account_opened'>Account Opened
              <ul className='account_opened'>
                <li onClick={() => filterDate('Last Week')}>Last Week</li>
                <li onClick={() => filterDate('Last Month')}>Last Month</li>
                <li onClick={() => filterDate('Last 3 Months')}>Last 3 Months</li>
                <li onClick={() => filterDate('Last 6 Months')}>Last 6 Months</li>
                <li onClick={() => filterDate('Last Year')}>Last Year</li>
              </ul>
            </div>
            <div className='form-profile-label select-area' id='status'>Status
              <ul className='status'>
                <li onClick={() => filterStatus('Paid')}>Paid</li>
                <li onClick={() => filterStatus('Free')}>Free</li>
              </ul>
            </div>
            <div className='form-profile-label' />
            <a className='form-profile-label cursor-pointer' id="csv-download">
              <img className='pl-13' src='../../../images/arrow-bottom.svg' alt='arrow bottom' />
            </a>
          </div>
          {!dentists && <div className='flex-wrapper'><CircularProgress size={120} /></div>}
          {dentists && dentists.map((item: any, key: any) => {
            return (key < 10 ? <div className='user-block' key={key}>
                <div className='user-list user-list-text bg-white user-data'>
                  <p>{item.email}</p>
                  <p>{getDate(item)}</p>
                  <p>{item.hasPaidPlan ? 'Paid Subscription Ends: 03/09/2021' : 'Free'}</p>
                  <UserViewProfileBlock>
                    <img src='../../../images/user.svg' />
                    <UserViewProfileLink target='_blank'
                                         href={`https://dev.d33ax28zfvruas.amplifyapp.com/dentist/person/${item.Username}`}>View
                      Profile</UserViewProfileLink>
                  </UserViewProfileBlock>
                  <UserViewProfileBlock>
                    <img className='open-user-profile open-info' src='../../../images/plus.svg'
                         onClick={() => clickRowOpen(key)} />
                  </UserViewProfileBlock>
                </div>
                <motion.div animate={userInfoShow ? 'visible' : 'hidden'} variants={variants} initial='hidden'>
                  <div className='user-info-text bg-green user-info preview'>
                    <div className='flex-2-column'>
                      <div>
                        <p><strong>Account Email:</strong></p>
                        <p><strong>GDC Number:</strong></p>
                        <p><strong>Post Code:</strong></p>
                        <p><strong>Last Logged In:</strong></p>
                        <p><strong>Subscription #:</strong></p>
                        {
                          !item.Enabled ?
                            <button className='button-green-outline border-white'
                                    onClick={() => handleClickOpen(item, 'Dentists', 'suspend')}>
                              Activate
                            </button> :
                            <button className='button-green-outline border-white'
                                    onClick={() => handleClickOpen(item, 'CancelDental', 'suspend')}>
                              Suspend
                            </button>
                        }
                      </div>
                      <div>
                        <p>{item.email ? item.email : 'none'}</p>
                        <p style={{ display: 'flex' }}>
                          <input type='text'
                                 className='gdc-update-input'
                                 name='gdcNumber'
                                 value={gdcNumber ? gdcNumber : item.gdcNumber}
                                 id='gdcNumber'
                                 disabled
                                 onChange={(e: any) => setGdcNumber(e.target.value)}
                          />
                          <button className='gdc-update-button' onClick={() => updateGdsNumber(key, item)}>
                            <img className='gdc-input-edit' src='../../../images/edit.svg' />
                          </button>
                        </p>
                        <p>{item.postCode ? item.postCode : 'none'}</p>
                        <p>{item.UserLastModifiedDate ? getFullDate(item) : 'none'}</p>
                        <p>{item.subscription ? item.subscription : 'none'}</p>
                        <ButtonRedOutline
                          onClick={() => handleClickOpen(item, 'RemoveDental', 'delete')}>Delete
                        </ButtonRedOutline>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div> : ''
            );
          })}
          <Pagination count={countPagination} color='primary' onChange={changePagination} />
        </div>
      </div>
      <Dialog open={openDelete} onClose={() => handleClose('delete')} aria-labelledby='form-dialog-title'>
        <DialogTitle id='customized-dialog-title'><p>Delete Account</p></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>You are about to permanently delete your account, and all of the issues, merge
              requests, and groups
              linked to your account. Once you confirm Delete account, it cannot be undone or
              recovered.</p>
            <br />
            <h5>Type "DELETE" to confirm:</h5>
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='delete'
            label='Delete Account'
            type='text'
            onChange={(e) => setDeleteAccount(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('delete')} color='primary'>
            Cancel
          </Button>
          <Button onClick={onRemoveAccount} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSuspend} onClose={() => handleClose('suspend')} aria-labelledby='form-dialog-title'>
        <DialogTitle id='customized-dialog-title'><p>Suspend Account</p></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p></p>
            <br />
            <h5>Type "SUSPEND" to confirm:</h5>
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='suspend'
            label='Suspend Account'
            type='text'
            onChange={(e) => setSuspendAccount(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('suspend')} color='primary'>
            Cancel
          </Button>
          <Button onClick={onSuspendAccount} color='primary'>
            Suspend
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}
          // @ts-ignore
               severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default AdminUsers;