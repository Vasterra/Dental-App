import React from "react";
import Menu from "src/components/menu";
import Services from "src/components/settings/services"

const AdminSettings = () => {

  return (
    <section className="container-profile ">
      <Menu active="Settings"/>
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
        <Services />
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
