import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ApiManager from 'src/services/ApiManager';
import Dashboard from 'src/pages/admin/dashboard';
import { Auth } from 'aws-amplify';
import Error from 'next/error';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Button } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      flexShrink: 0,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }),
);

type Props = {
  active: any,
}

const Login: React.FunctionComponent<Props> = ({ active }) => {

  const classes = useStyles();
  const theme = useTheme();

  const [dentist, setDentist]: any = useState();
  const [currentAuthenticatedUser, setCurrentAuthenticatedUser]: any = useState();
  const [fullName, setFullName] = useState('');
  const [emailDentist, setEmailDentist] = useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getCurrentAuthenticatedUser();
  }, []);

  const getCurrentAuthenticatedUser = async () => {
    await Auth.currentAuthenticatedUser().then(result => {
      setCurrentAuthenticatedUser(result);
      getListDentists(result);
    });
  };

  const getListDentists = async (dentist: any) => {
    try {
      ApiManager.getListDentists().then(listDentitst => {
        listDentitst.map((item: any) => {
          if (item.id === dentist.attributes.sub) {
            const nameFull: any = item.firstName ? item.firstName : '' + ' ' + item.lastName ? item.lastName : '';
            const email: any = item.email ? item.email : '';
            setFullName(nameFull);
            setEmailDentist(email);
            setDentist(item);
          }
        });
      });
    } catch (e) {
      return <Error statusCode={404} />;
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='leftmenu'>
        <div className='mobile-topmenu'>
          <p className='menu' id='mobile_menu'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
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
            <img className='user-image' src='../../../images/user-image.png' alt='user image' />
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
              <a className='leftmenu-link bold' href='/' onClick={ApiManager.signOut}>Logout</a>
              <img className='leftmenu-link-image' src='../../../images/left-arrow.svg' alt='link image' />
            </li>
          </ul>
        </div>
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Dashboard', 'Users', 'Settings'].map((text, index) => (
            <ListItem button key={index}>
              <Button href={`/admin/${text.toLowerCase()}`}>
                {text}
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>

  );

};

export default Login;

