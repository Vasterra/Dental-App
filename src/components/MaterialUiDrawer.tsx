import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import LeftDrawer from '../components/Drawer';
import { Drawer, Link } from '@material-ui/core';
import styled from 'styled-components'
import Layout from './Layout';

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

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

// @ts-ignore
export default function TemporaryDrawer({currentUser}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
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
              </div>
              <Menu className='leftmenu-nav-menu'>
                <Link href={`../../dentist/profile/${currentUser.username}`}>
                  <li className={`leftmenu-list`}>
                    <img className='leftmenu-link-image' src='../../images/user.svg' alt='link image' />
                    <a className='leftmenu-link'>Profile</a>
                  </li>
                </Link>
                <Link href={`../../dentist/gallery/${currentUser.username}`}>
                  <li className={`leftmenu-list`}>
                    <img className='leftmenu-link-image' src='../../images/gallery.svg' alt='link image' />
                    <a className='leftmenu-link'>Gallery</a>
                  </li>
                </Link>
                <Link href={`../../dentist/account/${currentUser.username}`}>
                  <li className={`leftmenu-list`}>
                    <img className='leftmenu-link-image' src='../../images/more_vert.svg' alt='link image' />
                    <a className='leftmenu-link'>Account</a>
                  </li>
                </Link>
              </Menu>
            </div>
            <div style={{ minWidth: '333px' }}/>
          </>
    </div>
  );

  
  const menuToggler = (onToggle: any)=>{
    return (
      <p className="menu" id="mobile_menu" onClick={currentUser && onToggle}>
      <svg className="menu-logo" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 28 20" width="20px">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
      </p>
    )
  }

  return (
    <>
      {(['left'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          {menuToggler(toggleDrawer(anchor, true))}
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}