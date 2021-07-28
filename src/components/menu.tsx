import React, {Component} from "react";
import {AmplifyAuthenticator} from '@aws-amplify/ui-react';

import ApiManager from "src/services/ApiManager";
import Dashboard from 'src/pages/admin/dashboard';

class Login extends Component<{ active: string }> {
  render() {
    return (
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
            <a href="/">
              <img src="../../../images/FYD4_beige-on-green@2x.png"
                   srcSet="../../../images/FYD4_beige-on-green@2x.png 2x, ../../../images/FYD4_beige-on-green@3x.png 3x"
                   className="logo-image"
              />
            </a>
          </p>
          <p>
            <img className="user-image-mobile" src="../../../images/user-image.png" alt="user image"/>
          </p>
        </div>
        <div className="leftmenu-content">
          <p>
            <a href="/">
              <img src="../../../images/FYD4_beige-on-green@2x.png"
                   srcSet="../../../images/FYD4_beige-on-green@2x.png 2x, ../../../images/FYD4_beige-on-green@3x.png 3x"
                   className="logo-image desctop-visible"
                   alt="logo image"
              />
            </a>
          </p>
          <div className="leftmenu-user-information">
            <img className="user-image" src="../../../images/user-image.png" alt="user image"/>
            <p className="user-description white"><span>Name</span> <span>Surname</span></p>
          </div>
          <ul className="leftmenu-nav-menu">
            <li className={`leftmenu-list + ${this.props.active === 'Dashboard' ? 'active' : ''}`}>
              <a className="leftmenu-link" href="../../admin/dashboard/">Dashboard</a>
              <img className="leftmenu-link-image" src="../../../images/dashboard.svg" alt="link image"/>
            </li>
            <li className={`leftmenu-list + ${this.props.active === 'Users' ? 'active' : ''}`}>
              <a className="leftmenu-link" href="../../admin/users/">Users</a>
              <img className="leftmenu-link-image" src="../../../images/user.svg" alt="link image"/>
            </li>
            <li className={`leftmenu-list + ${this.props.active === 'Settings' ? 'active' : ''}`}>
              <a className="leftmenu-link" href="../../admin/settings/">Settings</a>
              <img className="leftmenu-link-image" src="../../../images/more_vert.svg" alt="link image"/>
            </li>
            <li className="leftmenu-list logout">
              <a className="leftmenu-link bold" href="#" onClick={ApiManager.signOut}>Logout</a>
              <img className="leftmenu-link-image" src="../../../images/left-arrow.svg" alt="link image"/>
            </li>
            <li className="fill-mobile"></li>
          </ul>
        </div>
      </div>
    );
  }

};

export default Login;

