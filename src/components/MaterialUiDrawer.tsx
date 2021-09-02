import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import LeftDrawer from '../components/Drawer';
import { Drawer, Link } from '@material-ui/core';
import styled from 'styled-components'
import Layout from './Layout';

const LeftMenuWrapper = styled('div')`
  & ._leftmenu{
    align-self: stretch;
    width: 333px;
    height: 100vh;
    background-color: #095c5c;
    position: fixed;
  }

  & ._leftmenu-content{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px 25px 0 46px;
  }

  & ._leftmenu-list{}
  & ._leftmenu-list:hover ._leftmenu-link-image {
    filter: invert(0%);
  }

  & ._leftmenu-link-image{
    z-index: 2;
    width: 24px;
    filter: invert(100%) brightness(160%);
    transition: all 0.3s linear;
  }

  & ._leftmenu-link{
    position: relative;
    display: block;
    width: 333px;
    padding: 10px 0 10px 33%;
    font-family: PT Sans;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1.05px;
    text-align: left;
    text-decoration: none;
    color: var(--color-white);
    /*margin-bottom: 23px;*/
    margin-left: -46px;
    transition: all 0.3s linear;
    z-index: 1;
  }

  & ._leftmenu-nav-menu{
    list-style: none;
  }

  & a {
    cursor: pointer;
  }

  & ._logo-image {
    width: 98px;
    height: 47px;
    object-fit: contain;
  }
  & ._desctop-visible{
    display: block;
  }
`

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
  console.log(currentUser);
  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
         <LeftMenuWrapper>
            <div className='_leftmenu'>
              <div className='_leftmenu-content'>
                <p className='_link-actve'>
                  <Link href='/'>
                    <img src='../../images/FYD4_beige-on-green@2x.png'
                         srcSet='../../images/FYD4_beige-on-green@2x.png 2x, ../../images/FYD4_beige-on-green@3x.png 3x'
                         className='_logo-image _desctop-visible' alt='logo image'
                    />
                  </Link>
                </p>
              </div>
              {currentUser.attributes && <Menu className='_leftmenu-nav-menu'>
                <Link href={`../../dentist/profile/${currentUser.attributes.sub}`}>
                  <li className="_leftmenu-list">
                    <img className='_leftmenu-link-image' src='../../images/user.svg' alt='link image' />
                    <a className='_leftmenu-link'>Profile</a>
                  </li>
                </Link>
                <Link href={`../../dentist/gallery/${currentUser.attributes.sub}`}>
                  <li className="_leftmenu-list">
                    <img className='_leftmenu-link-image' src='../../images/gallery.svg' alt='link image' />
                    <a className='_leftmenu-link'>Gallery</a>
                  </li>
                </Link>
                <Link href={`../../dentist/account/${currentUser.attributes.sub}`}>
                  <li className="_leftmenu-list">
                    <img className='_leftmenu-link-image' src='../../images/more_vert.svg' alt='link image' />
                    <a className='_leftmenu-link'>Account</a>
                  </li>
                </Link>
                <Link href={`../../dentist/payment/${currentUser.attributes.sub}`}>
                  <li className="_leftmenu-list">
                    <img className='_leftmenu-link-image' src='../../images/more_vert.svg' alt='link image' />
                    <a className='_leftmenu-link'>Payment</a>
                  </li>
                </Link>
              </Menu> }
            </div>
            <div style={{ minWidth: '333px' }}/>
          </LeftMenuWrapper>
    </div>
  );

  
  const menuToggler = (onToggle: any)=>{
    return (
      <p onClick={currentUser && onToggle}>
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