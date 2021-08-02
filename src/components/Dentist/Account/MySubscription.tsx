import React from "react";

type Props = {
  currentDentist: any,
  onCancelSubscription: Function
}

const MySubscription: React.FunctionComponent<Props> = ({currentDentist, onCancelSubscription}) => {

  return (
    <div className="profile-block-box">
      <div className="profile-block-box">
        <div className="double-blocks-2">
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label" >Status</label>
            </p>
            <p>
              <input className="form-profile-input" type="text" name="status" id="status" value="" placeholder="ACTIVE" />
            </p>
          </div>
          <div>
            <p className="form-profile-label">
              <label className="form-profile-label" >Renewal</label>
            </p>
            <p>
              <input className="form-profile-input" type="text" name="renewal" id="renewal" value="01/06/2021" placeholder="01/06/2021" />
            </p>
          </div>
        </div>
        <p className="row-content">
          <button className="button-green" onClick={() => onCancelSubscription()}>Cancel subscription</button>
        </p>
      </div>
    </div>
  )
};

export default MySubscription
