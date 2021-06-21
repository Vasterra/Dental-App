import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "next/link";
import {Menu, MenuItem} from "@material-ui/core";
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import React, {useEffect, useState} from "react";
import {Auth, Hub} from "aws-amplify";
import Router from "next/router";

const initState: any = {
  signedInUser: false,
  currentUser: []
};

class Header extends React.Component {
  state = initState

  async componentDidMount() {
    await this.authListener();
  }

  async authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return this.setState({signedInUser: true})
        case 'signOut':
          return this.setState({signedInUser: false})
      }
    })
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      this.setState({currentUser})
      this.setState({signedInUser: true})
    } catch (err) {
    }
  }

  async signOut() {
    try {
      await Auth.signOut();
      await Router.replace('/')
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  render() {
    return (
      <AppBar position="static" style={{background: '#0d9da6'}}>
        <Toolbar style={{justifyContent: 'space-between', display: 'flex'}}>
          <div style={{alignItems: 'center', display: 'flex'}}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              {this.state.signedInUser && <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <MenuIcon {...bindTrigger(popupState)}/>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>
                        <Link href={"../../dentist/account/" + this.state.currentUser.username}>Account</Link>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Link href={"../../dentist/profile/" + this.state.currentUser.username}><a>Profile</a></Link>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Link href={"../../dentist/gallery/" + this.state.currentUser.username}><a>Gallery</a></Link>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Link
                          href={"../../dentist/subscriptions/" + this.state.currentUser.username}><a>Settings</a></Link>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </PopupState>}
            </IconButton>
            <Typography variant="h6">
              Dentist App
            </Typography>
          </div>
          <Link href={"../../../search"}>
            <Button color="inherit">Search</Button>
          </Link>
          {!this.state.signedInUser && (
            <div>
              <Link href={"../../../login"}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link href={"../../../register"}>
                <Button color="inherit">Register</Button>
              </Link>
            </div>
          )}
          {this.state.signedInUser && <Button onClick={this.signOut} color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header