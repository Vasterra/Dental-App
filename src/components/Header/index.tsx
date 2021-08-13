import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import ApiManager from 'src/services/ApiManager';
import TemporaryDrawer from '../MaterialUiDrawer';

const initState: any = {
  signedInUser: false,
  currentUser: []
};

class Header extends React.Component {
  state = initState;

  async componentDidMount() {
    await this.authListener();
  }

  async authListener() {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return this.setState({ signedInUser: true });
        case 'signOut':
          return this.setState({ signedInUser: false });
      }
    });
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      this.setState({ currentUser });
      this.setState({ signedInUser: true });
    } catch (err) {
    }
  }

  signOut() {
    void ApiManager.SIGN_OUT();
  }

  render() {
    return (
      <AppBar position='fixed' style={{ background: '#095c5c' }}>
        <Toolbar style={{ justifyContent: 'space-between', display: 'flex' }}>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            {this.state.signedInUser && <TemporaryDrawer currentUser={this.state.currentUser.username} />}
          </div>
          <a href='/'>
            <a className='link-actve'>
              <img src='../../images/FYD4_beige-on-green@2x.png'
                   srcSet='../../images/FYD4_beige-on-green@2x.png 2x,
             ../../images/FYD4_beige-on-green@3x.png 3x' className='logo-image'  alt='logo'/>
            </a>
          </a>
          {!this.state.signedInUser && (
            <div style={{ alignItems: 'center', display: 'flex' }}>
              {this.state.signedInUser && <a href={`../../dentist/account/'${this.state.currentUser.username}`}>
                <div className='user-logo-circle'>
                  <svg xmlns='http://www.w3.org/2000/svg' height='16px' viewBox='0 0 19 16' width='19px' fill='#707070'>
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path
                      d='M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                  </svg>
                </div>
              </a>}
              <Link href={'../../../login'}>
                <Button color='inherit'>Login</Button>
              </Link>
              <Link href={'../../../registration'}>
                <Button color='inherit'>Register</Button>
              </Link>
            </div>
          )}
          {this.state.signedInUser && (
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <a href={`../../dentist/account/${this.state.currentUser.username}`}>
                <div className='user-logo-circle'>
                  <svg xmlns='http://www.w3.org/2000/svg' height='16px' viewBox='0 0 19 16' width='19px' fill='#707070'>
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path
                      d='M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                  </svg>
                </div>
              </a>
              <Button onClick={this.signOut} color='inherit'>Logout</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;