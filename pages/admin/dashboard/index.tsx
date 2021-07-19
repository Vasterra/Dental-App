import React from "react";

const AdminDashboard = () => {

  return (
    <section className="container-profile">
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
            <img className="user-image-mobile" src="../../../images/user-image.png" alt="user image" />
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
            <li className="leftmenu-list active">
              <a className="leftmenu-link" href="../../admin/dashboard/">Dashboard</a>
              <img className="leftmenu-link-image" src="../../../images/dashboard.svg" alt="link image"/>
            </li>
            <li className="leftmenu-list">
              <a className="leftmenu-link" href="../../admin/users/">Users</a>
              <img className="leftmenu-link-image" src="../../../images/user.svg" alt="link image"/>
            </li>
            <li className="leftmenu-list">
              <a className="leftmenu-link" href="../../admin/settings/">Settings</a>
              <img className="leftmenu-link-image" src="../../../images/more_vert.svg" alt="link image"/>
            </li>
            <li className="leftmenu-list logout">
              <a className="leftmenu-link bold" href="#">Logout</a>
              <img className="leftmenu-link-image" src="../../../images/left-arrow.svg" alt="link image"/>
            </li>
            <li className="fill-mobile"></li>
          </ul>
        </div>
      </div>
      <div className="main-profile bg-white">
        <div className="profile-box-form">
          <div>
            <p className="form-login-title green px20">Current Month</p>
            <p className="form-login-subtitle gray px12 mb-6px">Summary</p>
            <div className="profile-block-box">
              <div className="double-blocks-5">
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">New Subscriptions</label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="82"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">New Free Accounts</label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="2"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">Subscriptions Closed </label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="2"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">Accounts Closed</label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="14"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">Images Uploaded</label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="382"/>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-box-form">
          <div>
            <p className="form-login-title green px20">Total Subscriptions</p>
            <p className="form-login-subtitle gray px12 mb-6px">Summary</p>
            <div className="profile-block-box">
              <div className="double-blocks-5">
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">Subscriptions</label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="134"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">Free Accounts</label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="24"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">Subscriptions Closed </label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="12"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">Accounts Closed</label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="23"/>
                  </p>
                </div>
                <div>
                  <p className="form-profile-label">
                    <label className="form-profile-label">Images Uploaded</label>
                  </p>
                  <p>
                    <input className="form-profile-input" type="text" name="" id="" value="" placeholder="1309"/>
                  </p>
                </div>
              </div>
            </div>
            <div className="profile-block-box">
              <div className="stripes">
                <div className="total">
                  <p>900</p>
                  <p>800</p>
                  <p>700</p>
                  <p>600</p>
                  <p>500</p>
                  <p>400</p>
                  <p>300</p>
                  <p>200</p>
                  <p>100</p>
                  <p>0</p>
                </div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="vertical-stripe"></div>
                <div className="years-block">
                  <p className="year">2021</p>
                  <p className="year-arrows">
                    <img src="../../../images/arrow_left_big.svg" alt="arrow left"/>
                    <img src="../../../images/arrow_right_big.svg" alt="arrow right"/>
                  </p>
                  <p className="circle-gray"></p>
                  <p className="year-text">
                    Free Accounts
                  </p>
                  <p className="circle-gray"></p>
                  <p className="year-text">
                    Subscriptions
                  </p>
                </div>
              </div>
              <div className="hor-stripe">
                <p>January</p>
                <p>February</p>
                <p>March</p>
                <p>April</p>
                <p>May</p>
                <p>June</p>
                <p>July</p>
                <p>August</p>
                <p>September</p>
                <p>October</p>
                <p>November</p>
                <p>December</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
