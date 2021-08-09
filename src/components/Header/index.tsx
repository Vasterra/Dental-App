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
import ApiManager from 'src/services/ApiManager';
import TemporaryDrawer from '../MaterialUiDrawer';

const logoImg = "https://awsdental-storage82304-dev.s3.eu-west-1.amazonaws.com/public/FYD4_beige-on-green%402x.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmV1LW5vcnRoLTEiRzBFAiEAjf4mGPxWBMfJ1vs80Od7OL9VHdqLxzMhLOmlpFr06RACICguVf%2BTsL27qbUnJNw2KxnKZrrmFEKlIgBFbBDaIF6mKv8CCNP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjA3ODE3MjcwMjA0IgxJ4t6r9YreJhJysvoq0wJo6Z%2FbBj6CrhzrM8OprbDicm6bWoToNlcmyGJlXAc3pl3iuhPRY7USD2DOLqvyeJQ0ck3fYT2EvnuiZXc4PgA9IVVbSWEjsL4xIOOytX5Mg1Wcsojeu6vHpPaUB6knn3%2Bao8sHI8CYKLgTlSL3vbsqzojcUZ2XJy1zwr0gcvjK9QhbAIARxNwR5ec2Xppv%2FYKtQq2XKaoV%2Bswgr%2FAJNkPj030xOrz1L2TklWknMJqxy3UYfNRz2%2Fca4qqAmR8LDlOdRMb%2Bpn3Spi7ktM%2Fc1jY0e92xuss7vTKNVdzV7L7EFa8lDRfBwzMdbM3%2FRLfb0fetguypako04bdGRggOjR6oPAn64OgLYENyGDYUNfYp0K7UfX2Vcij%2FoitvVZAsOaTtUc%2BPdOu%2FU0LmLlVDIHWJuDuc5nuRax2zP%2F1ExFX26ogDIChy7SmdqT9%2FAQBTwL2Bg54wmsn7hgY6swJpifCIheOhiPLMkhsDXlsYPpKn1f2tzAuqiIgko0NOqhDmXczHc%2Fh%2FJF9QswVCPE1JWrRXXABlFgj0rbByzOdqUS9sVJ1Keplodtau3fRk%2FUu4CW0T%2FoKeo6zyz6ZMpIzvYROT18YX2nivdcwstEFIztsOFlELq4vgjQM7Azrqi2yXGaWAXaESqWSFlkhzoG6arc1DVFQ%2F2NUs5Mvg4y%2B67G4Fzpk2N5I775achjovKi9jSGk%2FB6eXsQsqEvh1VlLB8r9562aTbtDFnt5DpDGtbkgmqJ%2FrCh5Frp6AfKqPipJ2YricEhGWGSe5k5ROXa542qKLfaSETNWyPavmmgXwSfqg2nCMYH%2FSmZ9UKKvTTTbZujfJwkjUbLFlDOzPRwkfyePDA6NGyMxqMlYSlZsyGerh&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210702T141019Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATAYW74O6NWFHQUBA%2F20210702%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=b0da6558612d3916718883c4c0f16055ae9d0e8ea0c25322f856f749e763fe43"

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

  render() {
    return (
      <AppBar position="fixed" style={{background: '#095c5c'}}>
        <Toolbar style={{justifyContent: 'space-between', display: 'flex'}}>
          <div style={{alignItems: 'center', display: 'flex'}}>
            {this.state.signedInUser && <TemporaryDrawer currentUser={this.state.currentUser.username}/>}
          </div>
          <Link href="/">
            <p className="link-actve">
            <img src="../../images/FYD4_beige-on-green@2x.png"
                 srcSet="../../images/FYD4_beige-on-green@2x.png 2x,
             ../../images/FYD4_beige-on-green@3x.png 3x" className="logo-image"/>
            </p>
          </Link>
          {!this.state.signedInUser && (
            <div style={{alignItems: 'center', display: 'flex'}}>
              {this.state.signedInUser && <a href={"../../dentist/account/" + this.state.currentUser.username}>
                <div className="user-logo-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 19 16" width="19px" fill="#707070">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path
                      d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </a>}
              <Link href={"../../../login"}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link href={"../../../registration"}>
                <Button color="inherit">Register</Button>
              </Link>
            </div>
          )}
          {this.state.signedInUser && (
            <div style={{alignItems: 'center', display: 'flex'}}>
              <a href={"../../dentist/account/" + this.state.currentUser.username}>
                <div className="user-logo-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 19 16" width="19px" fill="#707070">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path
                      d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </a>
              <Button onClick={ApiManager.signOut} color="inherit">Logout</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header