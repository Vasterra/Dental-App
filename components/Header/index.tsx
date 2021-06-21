import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "next/link";
import {Menu, MenuItem} from "@material-ui/core";
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import {useEffect, useState} from "react";
import {Auth, Hub} from "aws-amplify";
import Router from "next/router";

export default function Header() {
  const [signedInUser, setSignedInUser] = useState(false)

  useEffect(() => {
    authListener()
  })
  async function authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return setSignedInUser(true)
        case 'signOut':
          return setSignedInUser(false)
      }
    })
    try {
      await Auth.currentAuthenticatedUser()
      setSignedInUser(true)
    } catch (err) {}
  }

  async function signOut() {
    try {
      await Auth.signOut();
      await Router.replace('/')
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <AppBar position="static" style={{background: '#0d9da6'}}>
      <Toolbar style={{justifyContent: 'space-between', display: 'flex'}}>
        <div style={{alignItems: 'center', display: 'flex'}}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <>
                  <MenuIcon {...bindTrigger(popupState)}/>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                      <Link href={"../../dentist/account/"}>Account</Link>
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                      <Link href={"../../dentist/profile/"}><a>Profile</a></Link>
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                      <Link href={"../../dentist/gallery/"}><a>Gallery</a></Link>
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                      <Link href={"../../dentist/subscriptions/"}><a>Settings</a></Link>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          </IconButton>
          <Typography variant="h6">
            Dentist App
          </Typography>
        </div>
        <Link href={"../../../search"}>
          <Button color="inherit">Search</Button>
        </Link>
        {!signedInUser && (
          <div>
            <Link href={"../../../login"}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link href={"../../../register"}>
              <Button color="inherit">Register</Button>
            </Link>
          </div>
        )}
        {signedInUser && <Button onClick={signOut} color="inherit">Logout</Button>}
      </Toolbar>
    </AppBar>
  );
}