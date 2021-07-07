import Link from 'next/link'
import {API, Auth, Hub, Storage} from "aws-amplify";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Router} from 'next/router';
import ApiManager from '../services/ApiManager';

const Menu = styled("ul")`{
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 36px;

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

    @media (max-width: 1024px) {
      display: none;
    }
  }

  li:hover {
    color: #095c5c;
    background: #fff;
  }
}`;

const initState: any = {
  currentAvatar: null,
  currentUser: null,
  currentDentist: null,
  signedInUser: null
};

class Drawer extends React.Component {

  state = initState

  async componentDidMount() {
    await this.authListener();
    console.log(this.state.currentUser.attributes.sub)
    const currentDentist = await ApiManager.getDentist(this.state.currentUser.attributes.sub);
    this.setState({currentDentist: currentDentist.getDentist});
    await this.downloadAvatar();
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

  async downloadAvatar() {
    if (this.state.currentDentist === null) return
    try {
      const files =  await Storage.list('avatars/' + this.state.currentDentist.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      this.setState({currentAvatar: signedFiles[0]})
    } catch (error) {
      console.log('Error download Avatar file: ', error);
    }
  }

  render() {
    if (!this.state.signedInUser) return null
    return (
      this.state.signedInUser &&
      <>
        {this.state.currentDentist && <div className="leftmenu">
          <div className="mobile-topmenu">
            <p className="menu" id="mobile_menu">
              <svg className="menu-logo" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 28 20"
                   width="20px">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </p>
            <p>
              <Link href="/">
                <img src="../../images/FYD4_beige-on-green@2x.png"
                     srcSet="../../images/FYD4_beige-on-green@2x.png 2x,
             ../../images/FYD4_beige-on-green@3x.png 3x" className="logo-image" />
              </Link>
            </p>
            <p>
              <img className="user-image-mobile" src="../../images/user-image.png" alt="user image"/>
            </p>
          </div>
          <div className="leftmenu-content">
            <p>
              <a href="/"><img src="../../images/FYD4_beige-on-green@2x.png"
                               srcSet="../../images/FYD4_beige-on-green@2x.png 2x, ../../images/FYD4_beige-on-green@3x.png 3x"
                               className="logo-image desctop-visible" alt="logo image"/>
              </a>
            </p>
            <div className="leftmenu-user-information">
              {this.state.currentAvatar && <img className="user-image" src={this.state.currentAvatar} alt="user image" />}
              <p className="user-description white"><span>{this.state.currentDentist.firstName}</span>
                <span>{this.state.currentDentist.lastName}</span></p>
            </div>
          </div>
          <Menu>
            <li className="leftmenu-list">
              <img className="leftmenu-link-image" src="../../images/user.svg" alt="link image"/>
              <Link href={"../../dentist/profile/" + this.state.currentUser.username}>Profile</Link>
            </li>
            <li className="leftmenu-list">
              <img className="leftmenu-link-image" src="../../images/gallery.svg" alt="link image"/>
              <Link href={"../../dentist/gallery/" + this.state.currentUser.username}>Gallery</Link>
            </li>
            <li className="leftmenu-list">
              <img className="leftmenu-link-image" src="../../images/more_vert.svg" alt="link image"/>
              <Link href={"../../dentist/account/" + this.state.currentUser.username}>Account</Link>
            </li>
            <li className="leftmenu-list logout">
              <img className="leftmenu-link-image" src="../../images/left-arrow.svg" alt="link image"/>
              <a href="/" onClick={ApiManager.signOut}>Logout</a>
            </li>
          </Menu>
        </div>}
      </>
    );
  }
};

export default Drawer;