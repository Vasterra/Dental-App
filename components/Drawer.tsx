import Link from 'next/link'
import {Auth, Hub} from "aws-amplify";
import React, {useEffect, useState} from "react";
import styled from "styled-components";

const Menu = styled("div")`{
  min-width: 250px;
  background: #ffffff 0 0 no-repeat padding-box;
  border-right: 1px solid #0d9da6;
  opacity: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;

  a {
    text-align: center;
    font: normal normal normal 24px/32px Segoe UI;
    letter-spacing: 0px;
    color: #707070;
    opacity: 1;
    text-decoration: none;
    padding: 25px 0;
    border-bottom: 1px solid #0d9da6;
    width: 100%;

    &:hover {
      color: #FFFFFF;
      background: #037179 0 0 no-repeat padding-box;
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const initState: any = {
  signedInUser: false,
  currentUser: []
};

class MenuComponent extends React.Component {
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
    if (!this.state.signedInUser) return null
    return (
      this.state.signedInUser && <Menu>
        <Link href={"../../dentist/account/" + this.state.currentUser.username}>Account</Link>
        <Link href={"../../dentist/profile/" + this.state.currentUser.username}><a>Profile</a></Link>
        <Link href={"../../dentist/gallery/" + this.state.currentUser.username}><a>Gallery</a></Link>
        <Link href={"../../dentist/subscriptions/" + this.state.currentUser.username}><a>Settings</a></Link>
      </Menu>
    );
  }
}

export default MenuComponent;