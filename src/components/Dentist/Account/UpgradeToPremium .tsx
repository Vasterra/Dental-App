import React from "react";

type Props = {
  currentDentist: any,
}

const UpgradeToPremium: React.FunctionComponent<Props> = ({currentDentist}) => {

  return (
    <div className="profile-block-box">
      <div className="profile-block-box">
        <div>
          <p className="form-profile-label">
            <label className="form-profile-label">Features</label>
          </p>
          <p className="form-text">
            Verification Checkmark<br/>
            Up to 8 Services<br/>
            Add Second Location<br/>
            Add Website Address<br/>
            Add Phone Number<br/>
          </p>
        </div>
        <div>
          <p className="form-profile-label">
            <label className="form-profile-label">Pricing</label>
          </p>
          <p className="form-text">
            Monthly Payment of £42.00+VAT<br/>
            See Full Terms and Conditions Here
          </p>
        </div>
      </div>
    </div>
  )
};

export default UpgradeToPremium
