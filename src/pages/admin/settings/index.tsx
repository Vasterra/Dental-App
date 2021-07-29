import React from "react";
import Menu from "src/components/menu";
import Services from "src/components/settings/services"
import Details from "src/components/settings/details"

const AdminSettings = () => {

  return (
    <section className="container-profile ">
      <Menu active="Settings"/>
      <div className="main-profile bg-white">
        <Details />
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
                      <input className="form-profile-input" type="text" name="" id="" value="1"
                             placeholder="5" />
                    </p>
                  </div>
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Max Services</label>
                    </p>
                    <p>
                      <input className="form-profile-input" type="text" name="" id="" value="2"
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
                      <input className="form-profile-input" type="text" name="" id="" value="1"
                             placeholder="1" />
                    </p>
                  </div>
                  <div>
                    <p className="form-profile-label">
                      <label className="form-profile-label">Max Services</label>
                    </p>
                    <p>
                      <input className="form-profile-input" type="text" name="" id="" value="2"
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
                         value="1" placeholder="Verification Checkmark" />
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="2" placeholder="Feature 2" />
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="3" placeholder="Feature 3" />
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="4" placeholder="Feature 4" />
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="5" placeholder="Feature 5" />
                </p>
                <p className="add-plus">
                  <input className="form-profile-input " type="text" name="" id=""
                         value="6" placeholder="" />
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
                         value="1" placeholder="xx" />
                </p>
              </div>
              <div>
                <p className="form-profile-label">
                  <label className="form-profile-label">Terms and Conditions</label>
                </p>
                <p>
                  <input className="form-profile-input" type="text" name="" id=""
                         value="1" placeholder="Web Link" />
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
