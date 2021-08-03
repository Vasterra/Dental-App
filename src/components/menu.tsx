import React, {useEffect, useState} from "react";
import Link from 'next/link'
import ApiManager from "src/services/ApiManager";
import Dashboard from 'src/pages/admin/dashboard';
import {Auth} from "aws-amplify";
import Error from "next/error"

type Props = {
  active: any,
}

const Login: React.FunctionComponent<Props> = ({active}) => {

  const [dentist, setDentist]: any = useState();
  const [currentAuthenticatedUser, setCurrentAuthenticatedUser]: any = useState();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailDentist, setEmailDentist] = useState('');


  useEffect(() => {
    getCurrentAuthenticatedUser();
  }, [])

  const getCurrentAuthenticatedUser = async () => {
    await Auth.currentAuthenticatedUser().then(result => {
      setCurrentAuthenticatedUser(result);
      getListDentists(result);
    })
  };

  const getListDentists = async (dentist: any) => {
    try {
      ApiManager.getListDentists().then(listDentitst => {
        listDentitst.map((item: any) => {
          if (item.id === dentist.attributes.sub) {
            const nameFull: any = item.firstName ? item.firstName : '' + ' ' + item.lastName ? item.lastName : ''
            const email: any = item.email ? item.email : ''
            setFullName(nameFull)
            setEmailDentist(email)
            setDentist(item)
          }
        })
      });
    } catch (e) {
      return <Error statusCode={404}/>
    }
  };

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
          { dentist && <p className="user-description white"><span>{dentist.firstName}</span> <span>{dentist.lastName}</span></p> }
        </div>
        <ul className="leftmenu-nav-menu">
          <Link href="../../admin/dashboard/">
            <li className={`leftmenu-list + ${active === 'Dashboard' ? ' active' : ''}`}>
              <img className="leftmenu-link-image" src="../../images/user.svg" alt="link image"/>
              <a className="leftmenu-link">Dashboard</a>
            </li>
          </Link>
          <Link href="../../admin/users/">
            <li className={`leftmenu-list + ${active === 'Users' ? ' active' : ''}`}>
              <img className="leftmenu-link-image" src="../../images/gallery.svg" alt="link image"/>
              <a className="leftmenu-link">Users</a>
            </li>
          </Link>
          <Link href="../../admin/settings/">
            <li className={`leftmenu-list + ${active === 'Settings' ? ' active' : ''}`}>
              <img className="leftmenu-link-image" src="../../images/more_vert.svg" alt="link image"/>
              <a className="leftmenu-link">Settings</a>
            </li>
          </Link>
          <li className="leftmenu-list logout">
            <a className="leftmenu-link bold" href="#" onClick={ApiManager.signOut}>Logout</a>
            <img className="leftmenu-link-image" src="../../../images/left-arrow.svg" alt="link image"/>
          </li>
        </ul>
      </div>
    </div>
  );

};

export default Login;

