import React from "react";
import {Auth, Storage} from "aws-amplify";

type Props = {
  currentDentist: any,
  currentAvatar: any,
  uploadAvatar: Function,
}

const DisplayPhotos: React.FunctionComponent<Props> = ({currentDentist, currentAvatar, uploadAvatar}) => {


  return (
    <div className="profile-box-form">
      <p className="form-login-title green px20">Display Photos</p>
      <p className="form-login-subtitle gray px12 ">Information For Patients</p>
      <div className="box-2-box">
        <div className="profile-block-box">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Profile Picture</label>
            </p>
            <p className="row-content">
              <img src={currentAvatar} alt="profile image" />
            </p>
          </div>
          <p className="row-content">
            <label className="button-green-file">Upload</label>
            <input type="file" className="input-file" name="profile_picture" id="profile_picture"
              // @ts-ignore
                   onChange={uploadAvatar}/>
          </p>
        </div>
        { !currentDentist.hasPaidPlan && <div className="profile-block-box">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label">Cover</label>
            </p>
            <p className="profile-photo-box">
              <img className="image" src="../../../../images/cover-image.jpg" alt="cover image" />
            </p>
            <p className="row-content">
              <label className="button-green-file">Upload</label>
              <input type="file" className="input-file" name="cover_image" id="cover_image" />
            </p>
          </div>
          <div className="mt-30">
            <p className="form-profile-label">
              <label className="form-profile-label">Watermark</label>
            </p>
            <p className="profile-photo-box">
              <img className="image" src="../../../../images/empty-image.jpg" alt="watermark" />
            </p>
            <p className="row-content">
              <label className="button-green-file" >Upload</label>
              <input type="file" className="input-file" name="watermark" id="watermark" />
            </p>
          </div>
        </div> }
        { currentDentist.hasPaidPlan && <div className="profile-block-box  disabled">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label ">Cover</label>
            </p>
            <p className="profile-photo-box">
              <img className="image" src="../../../../images/empty-image.jpg" alt="cover image" />
            </p>
            <p className="row-content">
              <label className="button-green-file">Upload</label>
              <input type="file" className="input-file" name="cover_image" id="cover_image" />
            </p>

          </div>
          <div className="mt-30">
            <p className="form-profile-label">
              <label className="form-profile-label ">Watermark</label>
            </p>
            <p className="profile-photo-box">
              <img className="image" src="../../../../images/empty-image.jpg" alt="watermark" />

            </p>
            <p className="row-content">
              <label className="button-green-file">Upload</label>
              <input type="file" className="input-file" name="watermark" id="watermark" />
            </p>

          </div>

        </div> }
      </div>
    </div>
  )
}

export default DisplayPhotos;
