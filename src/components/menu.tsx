import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ApiManager from 'src/services/ApiManager';
import { Auth, Storage } from 'aws-amplify';
import Error from 'next/error';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';;
import IconButton from '@material-ui/core/IconButton';
import { Snackbar } from '@material-ui/core';
import { IDentist } from '../types/types';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import styled from 'styled-components'

import { MenuAvatar, MenuAvatar__DownloadInput, MenuAvatar__DownloadLabel } from '../styles/Menu.module';

const drawerWidth = 333;

const LeftMenuWrapper = styled('div')`
  & ._leftmenu{
    align-self: stretch;
    width: ${drawerWidth+'px'};
    height: 100vh;
    background-color: #095c5c;
    position: fixed;
  }
  & ._leftmenu-content{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px 25px 0 46px;
  }
  & ._leftmenu-list{}
  & ._leftmenu-list:hover ._leftmenu-link-image {
    filter: invert(0%);
  }
  & ._leftmenu-link-image{
    z-index: 2;
    width: 24px;
    filter: invert(100%) brightness(160%);
    transition: all 0.3s linear;
  }
  & ._leftmenu-link{
    position: relative;
    display: block;
    width: 333px;
    padding: 10px 0 10px 33%;
    font-family: PT Sans;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1.05px;
    text-align: left;
    text-decoration: none;
    color: var(--color-white);
    /*margin-bottom: 23px;*/
    margin-left: -46px;
    transition: all 0.3s linear;
    z-index: 1;
  }
  & ._leftmenu-nav-menu{
    list-style: none;
  }
  & a {
    cursor: pointer;
  }
  & ._logo-image {
    width: 98px;
    height: 47px;
    object-fit: contain;
  }
  & ._desctop-visible{
    display: block;
  }

  & ._close_button{
    position: absolute;
    top: 0;
    right: 0;
  }
`

const Menu = styled('ul')`{
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 36px;
    cursor: pointer;
    a {
      position: relative;
      display: block;
      width: 100%;
      padding: 10px 0 10px 24%;
      font-family: PT Sans;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 1.05px;
      text-align: left;
      text-decoration: none;
      color: #fff;
      /*margin-bottom: 23px;*/
      margin-left: -46px;
      transition: all .3s linear;
      z-index: 1;
      &:hover {
        color: #095c5c;
      }
    }
  }
  li:hover {
    color: #095c5c;
    background: #fff;
  }
}`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    title: {
      flexGrow: 1
    },
    hide: {
      display: 'none'
    },
    drawer: {
      flexShrink: 0
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: 0
    }
  })
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

type Props = {
  active: any,
}

const Login: React.FunctionComponent<Props> = ({ active }) => {

  const classes = useStyles();
  const theme = useTheme();

  const [dentist, setDentist] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [currentAvatar, setCurrentAvatar] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severity, setSeverity] = useState<any>();

  useEffect(() => {
    void getCurrentAuthenticatedUser();
  }, []);

  const getCurrentAuthenticatedUser = async () => {
    await Auth.currentAuthenticatedUser().then(result => {
      console.log(result);
      void getListDentists(result);
    });
  };

  const getListDentists = async (dentist: any) => {
    try {
      await ApiManager.GET_LIST_DENTIST().then((listDentists: IDentist[]) => {
        listDentists.map((item: any) => {
          if (item.id === dentist.attributes.sub) {
            // const nameFull: any = item.firstName ? item.firstName : '' + ' ' + item.lastName ? item.lastName : '';
            // const email: any = item.email ? item.email : '';
            setDentist(item);
            downloadAvatar(item);
          }
        });
      });
    } catch (error: any) {
      return <Error statusCode={404} />;
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const downloadAvatar = (currentDentist: any) => {
    void ApiManager.downloadAvatar(currentDentist).then(signedFiles => {
      setCurrentAvatar(signedFiles);
    });
  };

  const uploadAvatar = async (files: any) => {
    files.preventDefault();
    const file: any = files.target.files[0];
    const filename = file.name.split('.');
    try {
      await Storage.put('avatars/' + dentist.id + '/' + 'avatar.' + filename[filename.length - 1], file, {
        level: 'public',
        contentType: 'image/png'
      }).then(async (result: any) => {
        let signedFiles: any = Storage.get(result.key);
        signedFiles = await signedFiles.then((item: any) => {
          return item;
        });
        setMessageSnackbar('The avatar upload successfully!');
        setSeverity('success');
        setOpenSnackbar(true);
        setCurrentAvatar(signedFiles);
        downloadAvatar(dentist);
      })
      .catch(() => {
        setMessageSnackbar('The avatar was not uploaded!');
        setSeverity('warning');
        setOpenSnackbar(true);
      });
    } catch (error: any) {
      setMessageSnackbar(`Error uploading file: ${error}`);
      setSeverity('warning');
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
    <>
      <div className='leftmenu'>
        <div className='mobile-topmenu'>
          <p className='menu' id='mobile_menu'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='end'
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <svg className="menu-logo" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 28 20" width="20px">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </IconButton>
          </p>
          <p>
            <a href='/'>
              <img src='../../../images/FYD4_beige-on-green@2x.png'
                   srcSet='../../../images/FYD4_beige-on-green@2x.png 2x, ../../../images/FYD4_beige-on-green@3x.png 3x'
                   className='logo-image'
              />
            </a>
          </p>
          <p>
            <img className='user-image-mobile' src='../../../images/user-image.png' alt='user image' />
          </p>
        </div>
        <div className='leftmenu-content'>
          <p>
            <a href='/'>
              <img src='../../../images/FYD4_beige-on-green@2x.png'
                   srcSet='../../../images/FYD4_beige-on-green@2x.png 2x, ../../../images/FYD4_beige-on-green@3x.png 3x'
                   className='logo-image desctop-visible'
                   alt='logo image'
              />
            </a>
          </p>
          <div className='leftmenu-user-information'>
            {currentAvatar && <>
              <MenuAvatar src={currentAvatar} alt='user image' />
              <MenuAvatar__DownloadLabel>
                <CloudDownloadIcon />
                <MenuAvatar__DownloadInput type='file' onChange={uploadAvatar} />
              </MenuAvatar__DownloadLabel>
            </>
            }
            {!currentAvatar && <>
              <MenuAvatar src='../../../images/empty_avatar.png' alt='user image' />
              <MenuAvatar__DownloadLabel>
                <CloudDownloadIcon />
                <MenuAvatar__DownloadInput type='file' onChange={uploadAvatar} />
              </MenuAvatar__DownloadLabel>
            </>}
            {dentist &&
            <p className='user-description white'><span>{dentist.firstName}</span> <span>{dentist.lastName}</span></p>}
          </div>
          <ul className='leftmenu-nav-menu'>
            <Link href='../../admin/dashboard/'>
              <li className={`leftmenu-list + ${active === 'Dashboard' ? ' active' : ''}`}>
                <img className='leftmenu-link-image' src='../../images/user.svg' alt='link image' />
                <a className='leftmenu-link'>Dashboard</a>
              </li>
            </Link>
            <Link href='../../admin/users/'>
              <li className={`leftmenu-list + ${active === 'Users' ? ' active' : ''}`}>
                <img className='leftmenu-link-image' src='../../images/gallery.svg' alt='link image' />
                <a className='leftmenu-link'>Users</a>
              </li>
            </Link>
            <Link href='../../admin/settings/'>
              <li className={`leftmenu-list + ${active === 'Settings' ? ' active' : ''}`}>
                <img className='leftmenu-link-image' src='../../images/more_vert.svg' alt='link image' />
                <a className='leftmenu-link'>Settings</a>
              </li>
            </Link>
            <li className='leftmenu-list logout'>
              <a className='leftmenu-link bold' href='/' onClick={() => Auth.signOut()}>Logout</a>
              <img className='leftmenu-link-image' src='../../../images/left-arrow.svg' alt='link image' />
            </li>
          </ul>
        </div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {messageSnackbar}
        </Alert>
      </Snackbar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
      >
       <LeftMenuWrapper>
            <div className='_leftmenu'>
              <div className='_leftmenu-content'>
                <p className='_link-actve'>
                  <div className='_close_button'>
                    <IconButton onClick={handleDrawerClose}>
                      <ChevronLeftIcon color='secondary'/>
                    </IconButton>
                  </div>
                </p>
              </div>
              <Menu className='_leftmenu-nav-menu'>
                <Link href={`/admin/dashboard`}>
                  <li className="_leftmenu-list">
                    <img className='_leftmenu-link-image' src='../../images/user.svg' alt='link image' />
                    <a className='_leftmenu-link'>Dashboard</a>
                  </li>
                </Link>
                <Link href={`/admin/users`}>
                  <li className="_leftmenu-list">
                    <img className='_leftmenu-link-image' src='../../images/gallery.svg' alt='link image' />
                    <a className='_leftmenu-link'>Users</a>
                  </li>
                </Link>
                <Link href={`/admin/settings`}>
                  <li className="_leftmenu-list">
                    <img className='_leftmenu-link-image' src='../../images/more_vert.svg' alt='link image' />
                    <a className='_leftmenu-link'>Settings</a>
                  </li>
                </Link>
              </Menu>
            </div>
            <div style={{ minWidth: drawerWidth+'px' }}/>
          </LeftMenuWrapper>
      </Drawer>
    </>
  );
};

export default Login;

