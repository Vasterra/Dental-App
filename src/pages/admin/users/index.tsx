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
import { saveAs } from 'file-saver';
import UsersSearchPanel from '../../../components/users/usersSearchPanel';
import { IDentists } from '../../../types/types';
import { updateDentist } from '../../../graphql/mutations';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const articlesOnPage: any = 10;

const AdminUsers = () => {

  const [dentists, setDentists] = useState<IDentists[]>([]);
  const [oldDentists, setOldDentists] = useState<IDentists[]>([]);
  const [userInfoShow, setUserInfoShow] = useState<boolean>(false);
  const [countPagination, setCountPagination] = useState<any>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openSuspend, setOpenSuspend] = useState<boolean>(false);
  const [deleteAccount, setDeleteAccount] = useState<string>('');
  const [suspendAccount, setSuspendAccount] = useState<string>('');
  const [accountToDelete, setAccountToDelete] = useState<any>();
  const [groupName, setGroupName] = useState<string>('');
  const [gdcNumber, setGdcNumber] = useState<string>('');
  const [statusForModalTitle, setStatusForModalTitle] = useState<string>('');
  const [listGdcNumbers, setListGdcNumbers] = useState<any>([]);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [messageSnackbar, setMessageSnackbar] = useState<string>('');
  const [severity, setSeverity] = useState<any>();

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
      if (dentist.email.toLowerCase().indexOf(e.target.value) === 0) {
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
    let filteredDentists: IDentists[] = [];
    if (filter === 'Last Week') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.UserCreateDate).isSame(currentDate, 'week'));
    } else if (filter === 'Last Month') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.UserCreateDate).isSame(currentDate, 'month'));
    } else if (filter === 'Last 3 Months') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.UserCreateDate).subtract(3, 'month'));
    } else if (filter === 'Last 6 Months') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.UserCreateDate).subtract(6, 'month'));
    } else if (filter === 'Last Year') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.UserCreateDate).isSame(currentDate, 'year'));
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
    setStatusForModalTitle(open);
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
    } catch (error: any) {
      console.error('There as an Error', error);
    }
  };

  const listUsersGroupDental = async () => {
    setDentists([]);
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
    } catch (error: any) {
      console.error('There as an Error', error);
    }
  };

  async function getListUser(groupDental: IDentists[], groupCancelDental: IDentists[]) {
    const apiName = 'AdminQueries';
    const path = '/listUsers';
    const myInit = {
      queryStringParameters: {
        groupname: 'Admin'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    };
    await API.get(apiName, path, myInit);
    try {
      const mergeGroup: IDentists[] = groupDental.concat(groupCancelDental);
      try {
        void ApiManager.GET_LIST_DENTIST().then(listDentists => {
          const arr: any[] = [];
          mergeGroup.forEach((item: IDentists) => {
            const arr2 = {
              email: '',
              gdcNumber: '',
              postCode: '',
              subscription: '',
              hasPaidPlan: false,
              suspend: false
            };
            const dentFind = listDentists.find((val: { id: string; }) => val.id === item.Attributes[0].Value)
            item.Attributes[0].Value === dentFind.id ? arr2.gdcNumber = dentFind.gdcNumber : '';
            item.Attributes.forEach((val: any) => {
              val.Name === 'email' ? arr2.email = val.Value : '';
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
          const antPag: any = Math.ceil(arr.length / articlesOnPage);
          setCountPagination(antPag);
          setDentists(arr);
          setOldDentists(arr);
          setListGdcNumbers(arr.map(item => item.gdcNumber))
          setGdcNumber('');
        });
      } catch (e: any) {
        console.log(e);
      }
    } catch (error: any) {
      console.error('There as an Error', error);
    }
  }

  const downloadCSV = () => {
    let csvDataExcel: any[] = [];

    dentists.forEach((item: any) => {
      csvDataExcel.push(
        ['Account Email', item.email ? item.email : 'none'],
        ['GDC Number', item.gdcNumber ? item.gdcNumber : 'none'],
        ['Post Code', item.postCode ? item.postCode : 'none'],
        ['Last Logged In', item.UserLastModifiedDate ? getFullDate(item) : 'none'],
        ['Subscription', item.subscription ? item.subscription : 'none'],
        [null, '']
      );
    });

    csvDataExcel = csvDataExcel.map(function(el: any[]) {
      return [el[0], '"' + el[1] + '"'].join(el[0] ? ' - ' : '') + '\r\n';
    });
    saveAs(new Blob(csvDataExcel, { type: 'text/csv' }), 'Users.csv');
  };

  async function addUserToGroup() {
    const apiName = 'AdminQueries';
    const path = '/addUserToGroup';
    const myInit = {
      body: {
        groupname: groupName,
        username: accountToDelete.Attributes[0].Value
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    };
    await API.post(apiName, path, myInit);
    if (groupName === 'Dentists') {
      await API.graphql({
        query: updateDentist,
        variables: {
          input: {
            id: accountToDelete.Attributes[0].Value,
            isDisabled: false
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      await removeUserFromGroup('CancelDental');
      await enableUser();
    } else {
      await API.graphql({
        query: updateDentist,
        variables: {
          input: {
            id: accountToDelete.Attributes[0].Value,
            isDisabled: true
          }
        },
        // @ts-ignore
        authMode: 'AWS_IAM'
      });
      await removeUserFromGroup('Dentists');
      await disableUser();
    }
  }

  async function removeUserFromGroup(group: string) {
    const apiName = 'AdminQueries';
    const path = '/removeUserFromGroup';
    const myInit = {
      body: {
        groupname: group,
        username: accountToDelete.Attributes[0].Value
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
        username: accountToDelete.Attributes[0].Value
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
        username: accountToDelete.Attributes[0].Value
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
      await ApiManager.DELETE_DENTIST(accountToDelete);
      await ApiManager.CREATE_CLOSED_ACCOUNT(accountToDelete.Attributes[0].Value);
      await addUserToGroup();
    }
  };

  const onSuspendAccount = async () => {
    if (suspendAccount.toUpperCase() === statusForModalTitle.toUpperCase()) {
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
        await ApiManager.GET_UPDATE_DENTISTS(dentist, gdcNumber).then(() => {
          setMessageSnackbar('The GDC number update successfully!');
          setSeverity('success');
          setOpenSnackbar(true);
        })
        // setGdcNumber('')
        // await listUsersGroupDental();
      }
    }
  };

  const filterOnAsc = () => {
    let filterDate;
    setDentists([]);
    setTimeout(() => {
      filterDate = dentists.sort(function(a: any, b: any) {
        a = new Date(a.UserCreateDate).getTime();
        b = new Date(b.UserCreateDate).getTime();
        return a > b ? -1 : a < b ? 1 : 0;
      });
      setDentists(filterDate);
    });
  };

  const filterOnDesc = () => {
    let filterDate;
    setDentists([]);
    setTimeout(() => {
      filterDate = dentists.sort(function(a: any, b: any) {
        a = new Date(a.UserCreateDate).getTime();
        b = new Date(b.UserCreateDate).getTime();
        return a < b ? -1 : a > b ? 1 : 0;
      });
      setDentists(filterDate);
    });
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
          <UsersSearchPanel changeSearch={changeSearch} listUsersGroupDental={listUsersGroupDental} />
          <div className='user-list-header'>
            <div className='form-profile-label select-area' id='account_sort'>Dentist
              <ul className='account_sort'>
                <li onClick={() => filterOnAsc()}>Sort Asc</li>
                <li onClick={() => filterOnDesc()}>Sort Desc</li>
              </ul>
            </div>
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
            <a className='form-profile-label cursor-pointer' onClick={() => downloadCSV()}>
              <img className='pl-13' src='../../../images/arrow-bottom.svg' alt='arrow bottom' />
            </a>
          </div>
          {/*{dentists.length === 0 && <div className='flex-wrapper'><CircularProgress size={120} /></div>}*/}
          {dentists && dentists.map((item: any, key: any) => {
            return (key < 10 ? <div className='user-block' key={key}>
                <div className='user-list user-list-text bg-white user-data'>
                  <p>{item.email}</p>
                  <p>{getDate(item)}</p>
                  <p>{item.hasPaidPlan ? 'Paid' : 'Free'}</p>
                  <UserViewProfileBlock>
                    <img src='../../../images/user.svg' />
                    <UserViewProfileLink target='_blank'
                                         href={`https://main.d1x2glchgshk0s.amplifyapp.com/dentist/person/${item.Attributes[0].Value}`}>View
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
                                    onClick={() => handleClickOpen(item, 'Dentists', 'activate')}>
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
                                 value={listGdcNumbers[key]}
                                 id='gdcNumber'
                                 disabled
                                 onChange={(e: any) => {
                                   listGdcNumbers[key] = e.target.value;
                                   setGdcNumber(e.target.value);
                                 }}
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
          <Pagination count={countPagination} color='primary' onChange={changePagination} style={{marginTop: '10px'}}/>
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
      <Dialog open={openSuspend} onClose={() => handleClose(statusForModalTitle)} aria-labelledby='form-dialog-title'>
        <DialogTitle id='customized-dialog-title'><p>Suspend Account</p></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p></p>
            <br />
            <h5>`Type "{statusForModalTitle.toUpperCase()}" to confirm:`</h5>
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
            {statusForModalTitle}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default AdminUsers;