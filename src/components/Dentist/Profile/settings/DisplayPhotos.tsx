import React from "react";
import AddWatermark from "./AddWatermark";
import Router from 'next/router';

type Props = {
  currentDentist: any,
  currentAvatar: any,
  uploadAvatar: any,
}

const DisplayPhotos: React.FunctionComponent<Props> = ({currentDentist, currentAvatar, uploadAvatar}) => {
  return (
    <div className="profile-box-form">
      <div className='form-info-block'>
        <div>
          <p className="form-login-title green px20">Display Photos</p>
          <p className="form-login-subtitle gray px12 ">Information For Patients</p>
        </div>
        {currentDentist && !currentDentist.hasPaidPlan && <p className='form-login-buttons'>
          <button className='button-green-outline' onClick={() => {
            void Router.push(`../../dentist/account/${currentDentist.id}`);
          }}>Upgrade
          </button>
        </p>}
      </div>
      <div className="box-2-box">
        <div className="profile-block-box">
          <div>
            <p className="form-profile-label"><label className="form-profile-label">Profile Picture</label>
            </p>
            <p className="load-avatar__block">
              <img src={currentAvatar ? currentAvatar : "../../../images/empty_avatar.png"} alt="profile image" />
            </p>
          </div>
          <p className="row-content">
            <label className="button-green-file">Upload</label>
            <input type="file" className="input-file" name="profile_picture" id="profile_picture"
              // @ts-ignore
                   onChange={uploadAvatar}/>
          </p>
        </div>
        { !currentDentist.hasPaidPlan && <div className="profile-block-box disabled">
            <AddWatermark currentDentist={currentDentist}/>
        </div> }
        { currentDentist.hasPaidPlan && <div className="profile-block-box">
          <AddWatermark currentDentist={currentDentist}/>
        </div> }
      </div>
    </div>
  )
}

export default DisplayPhotos;
