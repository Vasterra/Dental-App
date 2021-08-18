import React, { useEffect, useState } from 'react';
import Menu from 'src/components/menu';
import ApiManager from 'src/services/ApiManager';
import Error from 'next/error';
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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const AdminUsers = () => {

  const articlesOnPage = 10;

  const [dentists, setDentists]: any = useState();
  const [oldDentists, setOldDentists]: any = useState();
  const [userInfoShow, setUserInfoShow]: any = useState(false);
  const [countPagination, setCountPagination]: any = useState();
  const [open, setOpen] = React.useState(false);
  const [deleteAccount, setDeleteAccount]: any = useState();
  const [accountToDelete, setAccountToDelete] = useState();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState('');

  const variants = {
    visible: { opacity: 1, height: 'auto' },
    hidden: { opacity: 0, height: 0 }
  };

  useEffect(() => {
    getListDentists();
  }, []);

  const getListDentists = () => {
    setDentists(null);
    try {
      ApiManager.getListDentists().then(listDentists => {
        setCountPagination(Math.ceil(listDentists.length / articlesOnPage));
        setDentists(listDentists);
        setOldDentists(listDentists);
      });
    } catch (e) {
      return <Error statusCode={404} />;
    }
  };

  const changeSearch = async (e: any) => {
    setDentists(null);
    let allDentists: any[] = [];
    let result = oldDentists.map(async (item: any) => {
      if (item.firstName.toLowerCase().indexOf(e) === 0) {
        return item;
      }
    });
    result = await Promise.all(result);
    result.forEach((item: string | any[]) => {
      if (item !== undefined) {
        allDentists.push(item);
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

  const getDate = (dentist: { createdAt: string | number | Date; }) => {
    const resultDate = new Date(dentist.createdAt);
    return `${resultDate.getDate() < 10 ? '0' + resultDate.getDate() : resultDate.getDate()}
    .${resultDate.getMonth() < 10 ? '0' + resultDate.getMonth() : resultDate.getMonth()}
    .${resultDate.getFullYear()}`;
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

  const handleClickOpen = (account: React.SetStateAction<undefined>) => {
    setAccountToDelete(account);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let nextToken: any;

  async function getUser() {
    let apiName = 'AdminQueries';
    let path = '/listUsers';
    let myInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    };
    const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    nextToken = NextToken;
    console.log(rest);
    return rest;
  }

  const onRemoveAccount = () => {
    if (deleteAccount.toUpperCase() === 'DELETE') {
      console.log(Auth.currentAuthenticatedUser());
      handleClose();
      getUser();
      // document.location.href = '/login';
      // user.deleteUser(error => {
      //   if (error) {
      //     return reject(error);
      //   }
      //   void ApiManager.deleteDentist(accountToDelete);
      //   void ApiManager.CREATE_CLOSED_ACCOUNT(accountToDelete.id);
      //
      //   void ApiManager.signOut();
      //   document.location.href = '/login';
      //
      //   resolve();
      // });
      // void ApiManager.deleteDentist(accountToDelete);
      // void ApiManager.CREATE_CLOSED_ACCOUNT(accountToDelete.id);
      setMessageSnackbar('The user was successfully deleted!');
      setSeverity('success');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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
            <div className='form-profile-label'>
              <img className='pl-13' src='../../../images/arrow-bottom.svg' alt='arrow bottom' />
            </div>
          </div>
          {!dentists && <div className='flex-wrapper'><CircularProgress size={120} /></div>}
          {dentists && dentists.map((item: any, key: any) => {
            return (
              <div className='user-block' key={key}>
                <div className='user-list user-list-text bg-white user-data'>
                  <p>{item.firstName}</p>
                  <p>{getDate(item)}</p>
                  <p>{item.hasPaidPlan ? 'Paid Subscription Ends: 03/09/2021' : 'Free'}</p>
                  <UserViewProfileBlock>
                    <img src='../../../images/user.svg' />
                    <UserViewProfileLink target='_blank'
                                         href={`https://dev.d33ax28zfvruas.amplifyapp.com/dentist/person/${item.id}`}>View
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
                        <button className='button-green-outline border-white'>Suspend</button>
                      </div>
                      <div>
                        <p>{item.email ? item.email : 'none'}</p>
                        <p>{item.gdcNumber ? item.gdcNumber : 'none'}</p>
                        <p>{item.postIndex ? item.postIndex : 'none'}</p>
                        <p>13:05 04/04/2021</p>
                        <p>#StripeID</p>
                        <button className='button-green-outline border-white'
                                onClick={() => handleClickOpen(item)}>Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
          <Pagination count={countPagination} color='primary' onChange={changePagination} />
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
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
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button disabled={deleteAccount !== 'delete'} onClick={onRemoveAccount} color='primary'>
            Delete
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

