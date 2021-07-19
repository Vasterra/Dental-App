import React from "react";

const AdminSettings = () => {

  return (
    <section className="container-profile ">
      <div className="leftmenu">
        <div className="mobile-topmenu">
          <p className="menu" id="mobile_menu">
            <svg className="menu-logo" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 28 20" width="20px">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </p>
          <p>
            <a href="/"><img src="../../../images/FYD4_beige-on-green@2x.png"
                             srcSet="../../../images/FYD4_beige-on-green@2x.png 2x, ../../../images/FYD4_beige-on-green@3x.png 3x"
                             className="logo-image" />
            </a>
          </p>
          <p>
            <img className="user-image-mobile" src="../../../images/user-image.png" alt="user image" />
          </p>
        </div>
        <div className="leftmenu-content">
          <p>
            <a href="/"><img src="../../../images/FYD4_beige-on-green@2x.png"
                             srcSet="../../../images/FYD4_beige-on-green@2x.png 2x, ../../../images/FYD4_beige-on-green@3x.png 3x"
                             className="logo-image desctop-visible" alt="logo image" />
            </a>
          </p>
          <div className="leftmenu-user-information">
            <img className="user-image" src="images/user-image.png" alt="user image"/>
            <p className="user-description white"><span>Name</span> <span>Surname</span></p>
          </div>
          <ul className="leftmenu-nav-menu">
            <li className="leftmenu-list">
              <a className="leftmenu-link" href="../../admin/dashboard/">Dashboard</a>
              <img className="leftmenu-link-image" src="../../../images/dashboard.svg" alt="link image"/>
            </li>
            <li className="leftmenu-list">
              <a className="leftmenu-link"href="../../admin/users/">Users</a>
              <img className="leftmenu-link-image" src="../../../images/user.svg" alt="link image"/>
            </li>
            <li className="leftmenu-list active">
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
          <div className="form-info-block">
            <div>
              <p className="form-login-title green px20">Admin Details</p>
              <p className="form-login-subtitle gray px12 mb-6px">Login Details</p>
            </div>
          </div>
          <div className="box-2-box">
            <div className="profile-block-box">
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label" htmlFor="name">Name</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="name" id="name"
                         value=""
                         placeholder="Admin Name" />
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label" htmlFor="email">Email</label>
                </p>
                <p>
                  <input className="form-profile-input" type="email" name="email" id="email" value=""
                         placeholder="John.smith@dental.co.uk" />
                </p>
              </div>

            </div>
            <div className="profile-block-box">
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Reset Password</label>
                </p>
                <p className="row-content">
                  <span className="input-span">Current</span> <input className="form-profile-input" type="text"
                                                                     name="current" id="current" value=""
                                                                     placeholder="XXXXXXXXXXXXXXX" />
                </p>
                <p className="row-content">
                  <span className="input-span">New</span> <input className="form-profile-input" type="text"
                                                                 name="new" id="new" value=""
                                                                 placeholder="Xxxxx" />
                </p>
              </div>
              <p className="row-content">
                <span className="input-span"></span>
                <button className="button-green">Reset Password</button>
              </p>
            </div>
          </div>
        </div>
        <div className="profile-box-form">
          <div className="form-info-block">
            <div>
              <p className="form-login-title green px20">Services Provided</p>
              <p className="form-login-subtitle gray px12 ">Available Service Categories</p>
            </div>
          </div>
          <div className="box-2-box">
            <div className="profile-block-box">
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Add Service</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="add_service" id="add_service"
                         value=""
                         placeholder="Service Name Here" />
                </p>
              </div>
              <p className="row-content">
                <button className="button-green">Add service</button>
              </p>
            </div>
            <div className="profile-block-box">
              <div>
                <p className="form-login-input">
                  <input type="text" name="" value="" id="" placeholder="Service 1" />
                    <img className="form-login-input-edit" src="../../../images/edit.svg" />
                    <img className="form-login-input-close" src="../../../images/close.svg" />
                </p>
                <p className="form-login-input">
                  <input type="text" name="" value="" id="" placeholder="Service 2" />
                    <img className="form-login-input-edit" src="../../../images/edit.svg" />
                    <img className="form-login-input-close" src="../../../images/close.svg" />
                </p>
                <p className="form-login-input">
                  <input type="text" name="" value="" id="" placeholder="Service 3" />
                    <img className="form-login-input-edit" src="../../../images/edit.svg" />
                    <img className="form-login-input-close" src="../../../images/close.svg" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-box-form">
          <div className="form-info-block-paid">
            <div>
              <p className="form-login-title green px20">Paid Subscriber</p>
              <p className="form-login-subtitle gray px12 mb-6px">Set Limits</p>
              <div className="profile-block-box">
                <div className="double-blocks-3">
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Max Locations</label>
                    </p>
                    <p>
                      <input className="form-profile-input" type="text" name="" id="" value=""
                             placeholder="5" />
                    </p>
                  </div>
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Max Services</label>
                    </p>
                    <p>
                      <input className="form-profile-input" type="text" name="" id="" value=""
                             placeholder="8" />
                    </p>
                  </div>
                  <div></div>
                </div>
                <div className="double-blocks-3">
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Website Address</label>
                    </p>
                    <p>
                      <button className="button-on">On <span className="button-on-inner-button"></span> <span
                        className="off">Off</span></button>
                    </p>
                  </div>
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Phone Number</label>
                    </p>
                    <p>
                      <button className="button-on">On <span className="button-on-inner-button"></span> <span
                        className="off">Off</span></button>
                    </p>
                  </div>
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Appear Verified</label>
                    </p>
                    <p>
                      <button className="button-on">On <span className="button-on-inner-button"></span> <span
                        className="off">Off</span></button>
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <div>
              <p className="form-login-title green px20">Free Subscriber</p>
              <p className="form-login-subtitle gray px12 mb-6px">Set Limits</p>
              <div className="profile-block-box">
                <div className="double-blocks-3">
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Max Locations</label>
                    </p>
                    <p>
                      <input className="form-profile-input" type="text" name="" id="" value=""
                             placeholder="1" />
                    </p>
                  </div>
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Max Services</label>
                    </p>
                    <p>
                      <input className="form-profile-input" type="text" name="" id="" value=""
                             placeholder="2" />
                    </p>
                  </div>
                  <div></div>
                </div>
                <div className="double-blocks-3">
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Website Address</label>
                    </p>
                    <p>
                      <button className="button-off"><span className="on">On</span> <span
                        className="button-off-inner-button"></span> Off
                      </button>
                    </p>
                  </div>
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Phone Number</label>
                    </p>
                    <p>
                      <button className="button-off"><span className="on">On</span> <span
                        className="button-off-inner-button"></span> Off
                      </button>
                    </p>
                  </div>
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Appear Verified</label>
                    </p>
                    <p>
                      <button className="button-off"><span className="on">On</span> <span
                        className="button-off-inner-button"></span> Off
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-box-form">
          <div className="form-info-block">
            <div>
              <p className="form-login-title green px20">Premium Information</p>
              <p className="form-login-subtitle gray px12 mb-6px">Information for Free Users</p>
            </div>
          </div>
          <div className="box-2-box">
            <div className="profile-block-box">
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Premium Features</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="" placeholder="Verification Checkmark" />
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="" placeholder="Feature 2" />
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="" placeholder="Feature 3" />
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="" placeholder="Feature 4" />
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="" placeholder="Feature 5" />
                </p>
                <p className="add-plus">
                  <input className="form-profile-input " type="text" name="" id=""
                         value="" placeholder="" />
                    <img className="plus" id="plus" src="../../../images/plus.svg" alt="" />
                </p>
              </div>


            </div>
            <div className="profile-block-box">
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Price</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="" placeholder="xx" />
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Terms and Conditions</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="" placeholder="Web Link" />
                </p>
              </div>
              <p className="row-content">
                <button className="button-green">Save</button>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdminSettings;
