import Link from 'next/link'
import {API, Auth, Hub, Storage} from "aws-amplify";
import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import {Router, withRouter} from 'next/router';
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

class Drawer extends Component {

  state: any = {
    currentDentist: null,
    currentAvatar: null,
    signedInUser: null,
    currentUser: null,
  }

  async componentDidMount() {
    await this.getDentist()
  }

  async authListener() {
    const {router}: any = this.props
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          return this.setState({signedInUser: true})
        case 'signOut':
          return this.setState({signedInUser: false})
      }
    })
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      this.setState({currentUser})
      this.setState({signedInUser: true})
      if (!this.state.currentUser.username === this.state.currentDentist.id) return router.push('/dentist/account/' + this.state.currentDentist.id)
    } catch (err) {
    }
  }

  async getDentist() {
    const {router}: any = this.props
    if (router.query.slug === undefined) return;
    const currentDentist = await ApiManager.getDentist(router.query.slug[0]);
    this.setState({currentDentist: currentDentist.getDentist});
    await this.authListener()
    await this.downloadAvatar()
  }

  async downloadAvatar() {
    if (this.state.currentDentist === null) return
    try {
      const files = await Storage.list('avatars/' + this.state.currentDentist.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      console.log(signedFiles)
      this.setState({currentAvatar: signedFiles[signedFiles.length - 1]})
    } catch (error) {
      console.log('Error download Avatar file: ', error);
    }
  }

  async downloadImages() {
    try {
      if (this.state.dentist === null) return
      const files = await Storage.list('images/' + this.state.dentist.id + '/')
      let signedFiles = files.map((f: { key: string; }) => Storage.get(f.key))
      signedFiles = await Promise.all(signedFiles)
      let filesList = signedFiles.map((f: any) => {
        return {
          thumbnail: f,
          src: f,
          name: f,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          isSelected: false
        }
      })
      this.setState({images: filesList})
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  render() {
    if (!this.state.signedInUser) return null
    return (
      this.state.currentUser &&
      <>
        {this.state.currentUser.username === this.state.currentDentist.id &&
        <div className="leftmenu">
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
             ../../images/FYD4_beige-on-green@3x.png 3x" className="logo-image"/>
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
                  {this.state.currentAvatar && <img className="user-image" src={this.state.currentAvatar} alt="user image"/>}
                    <p className="user-description white"><span>{this.state.currentDentist.firstName}</span>
                        <span>{this.state.currentDentist.lastName}</span></p>
                </div>
            </div>
            <Menu>
                <li className="leftmenu-list">
                    <img className="leftmenu-link-image" src="../../images/user.svg" alt="link image"/>
                    <a href={"../../dentist/profile/" + this.state.currentUser.username}>Profile</a>
                </li>
                <li className="leftmenu-list">
                    <img className="leftmenu-link-image" src="../../images/gallery.svg" alt="link image"/>
                    <a href={"../../dentist/gallery/" + this.state.currentUser.username}>Gallery</a>
                </li>
                <li className="leftmenu-list">
                    <img className="leftmenu-link-image" src="../../images/more_vert.svg" alt="link image"/>
                    <a href={"../../dentist/account/" + this.state.currentUser.username}>Account</a>
                </li>
                <li className="leftmenu-list logout">
                    <img className="leftmenu-link-image" src="../../images/left-arrow.svg" alt="link image"/>
                    <a href="/login" onClick={ApiManager.signOut}>Logout</a>
                </li>
            </Menu>
        </div>}
      </>
    );
  }
};

// @ts-ignore
export default withRouter(Drawer);