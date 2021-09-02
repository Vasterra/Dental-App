import Link from 'next/link';
import { Auth, Hub, Storage } from 'aws-amplify';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import ApiManager from 'src/services/ApiManager';
import styled from 'styled-components';
import Header from './Header';

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

class Drawer extends Component<{ currentAvatar: string, active: string, currentDentist: any, userName: any }> {

  state: any = {
    currentDentist: null,
    signedInUser: null,
    currentUser: null
  };

  async componentDidMount() {
    await this.getDentist();
  }

  async authListener() {
    const { router }: any = this.props;
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
      if (!this.state.currentUser.attributes.sub === this.state.currentDentist.id) {
        return router.push(`{/dentist/account/'${this.state.currentDentist.id}`);
      }
    } catch (err: any) {
    }
  }

  async getDentist() {
    const { router }: any = this.props;
    if (router.query.slug === undefined) return;
    const currentDentist = await ApiManager.getDentist(router.query.slug[0]);
    this.setState({ currentDentist: currentDentist });
    await this.authListener();
  }


  async downloadImages() {
    try {
      if (this.state.dentist === null) return;
      const files = await Storage.list('images/' + this.state.dentist.id + '/');
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key));
      signedFiles = await Promise.all(signedFiles);
      let filesList = signedFiles.map((f: any) => {
        return {
          thumbnail: f,
          src: f,
          name: f,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          isSelected: false
        };
      });
      this.setState({ images: filesList });
    } catch (error: any) {
      console.log('Error uploading file: ', error);
    }
  }

  signOut() {
    void ApiManager.SIGN_OUT();
  }

  render() {
    if (!this.state.signedInUser) return null;
    console.log(this.state.currentUser);
    return (
      <>
        {this.state.currentUser && this.state.currentUser.attributes.sub === this.props.currentDentist.id &&
          <>
            <div className='mobile-header'>
              <Header/>
            </div>
            <div className='leftmenu'>
              <div className='leftmenu-content'>
                  <p className='link-actve'>
                    <Link href='/'>
                      <img src='../../images/FYD4_beige-on-green@2x.png'
                          srcSet='../../images/FYD4_beige-on-green@2x.png 2x, ../../images/FYD4_beige-on-green@3x.png 3x'
                          className='logo-image desctop-visible' alt='logo image'
                      />
                    </Link>
                  </p>
                  <div className='leftmenu-user-information'>
                    <img className='user-image'
                        src={this.props.currentAvatar  ? this.props.currentAvatar : "../../images/empty_avatar.png"}
                        alt="profile image" />
                    <p className='user-description white'><span>{this.props.currentDentist.firstName || ''}</span>
                      <span>{this.props.currentDentist.lastName || ''}</span></p>
                  </div>
              </div>
              <Menu>
                <Link href={`../../dentist/profile/${this.state.currentUser.attributes.sub}`}>
                  <li className={`leftmenu-list + ${this.props.active === 'activeProfile' ? 'active' : ''}`}>
                    <img className='leftmenu-link-image' src='../../images/user.svg' alt='link image' />
                    <a className='leftmenu-link'>Profile</a>
                  </li>
                </Link>
                <Link href={`../../dentist/gallery/${this.state.currentUser.attributes.sub}`}>
                  <li className={`leftmenu-list + ${this.props.active === 'activeGallery' ? 'active' : ''}`}>
                    <img className='leftmenu-link-image' src='../../images/gallery.svg' alt='link image' />
                    <a className='leftmenu-link'>Gallery</a>
                  </li>
                </Link>
                <Link href={`../../dentist/account/${this.state.currentUser.attributes.sub}`}>
                  <li className={`leftmenu-list + ${this.props.active === 'activeAccount' ? 'active' : ''}`}>
                    <img className='leftmenu-link-image' src='../../images/more_vert.svg' alt='link image' />
                    <a className='leftmenu-link'>Account</a>
                  </li>
                </Link>
                <Link href={`../../dentist/payment/${this.state.currentUser.attributes.sub}`}>
                <li className={`leftmenu-list + ${this.props.active === 'activePayment' ? 'active' : ''}`}>
                    <img className='leftmenu-link-image' src='../../images/more_vert.svg' alt='link image' />
                    <a className='leftmenu-link'>Payment</a>
                  </li>
                </Link>
                <li className='leftmenu-list logout'>
                  <img className='leftmenu-link-image' src='../../images/left-arrow.svg' alt='link image' />
                  <a className='leftmenu-link' href='/login' onClick={this.signOut}>Logout</a>
                </li>
              </Menu>
            </div>
            <div style={{ minWidth: '333px' }}/>
          </>
        }
      </>
    );
  }
};

// @ts-ignore
export default withRouter(Drawer);