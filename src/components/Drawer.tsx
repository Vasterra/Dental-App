import Link from 'next/link';
import { Auth, Hub, Storage } from 'aws-amplify';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import ApiManager from 'src/services/ApiManager';
import styled from 'styled-components';

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

class Drawer extends Component<{ currentAvatar: string, active: string, currentDentist: any }> {

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
      if (!this.state.currentUser.username === this.state.currentDentist.id) {
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
    return (
      <>
        {this.state.currentUser && this.state.currentUser.username === this.props.currentDentist.id &&
          <>
            <div className='leftmenu'>
              <div className='mobile-topmenu'>
                <p className='menu' id='mobile_menu'>
                  <svg className='menu-logo' xmlns='http://www.w3.org/2000/svg' height='28px' viewBox='0 0 28 20'
                       width='20px'>
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
                  </svg>
                </p>
                <p className='link-actve'>
                  <Link href='/'>
                    <img src='../../images/FYD4_beige-on-green@2x.png'
                         srcSet='../../images/FYD4_beige-on-green@2x.png 2x,
             ../../images/FYD4_beige-on-green@3x.png 3x' className='logo-image' />
                  </Link>
                </p>
                <p>
                  <img className='user-image-mobile' src='../../images/user-image.png' alt='user image' />
                </p>
              </div>
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
                  {this.props.currentAvatar &&
                  <img className='user-image'
                       src={this.props.currentAvatar !== '' ? this.props.currentAvatar : '../../../images/empty_avatar.png'}
                       alt='user image' />}
                  <p className='user-description white'><span>{this.props.currentDentist.firstName || 'firstname'}</span>
                    <span>{this.props.currentDentist.lastName || 'lastName'}</span></p>
                </div>
              </div>
              <Menu>
                <Link href={`../../dentist/profile/${this.state.currentUser.username}`}>
                  <li className={`leftmenu-list + ${this.props.active === 'activeProfile' ? 'active' : ''}`}>
                    <img className='leftmenu-link-image' src='../../images/user.svg' alt='link image' />
                    <a className='leftmenu-link'>Profile</a>
                  </li>
                </Link>
                <Link href={`../../dentist/gallery/${this.state.currentUser.username}`}>
                  <li className={`leftmenu-list + ${this.props.active === 'activeGallery' ? 'active' : ''}`}>
                    <img className='leftmenu-link-image' src='../../images/gallery.svg' alt='link image' />
                    <a className='leftmenu-link'>Gallery</a>
                  </li>
                </Link>
                <Link href={`../../dentist/account/${this.state.currentUser.username}`}>
                  <li className={`leftmenu-list + ${this.props.active === 'activeAccount' ? 'active' : ''}`}>
                    <img className='leftmenu-link-image' src='../../images/more_vert.svg' alt='link image' />
                    <a className='leftmenu-link'>Account</a>
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