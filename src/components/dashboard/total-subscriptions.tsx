import React from "react";
import Subscriptions from "./totalSubscriptions/subscriptions"
import Graph from "./totalSubscriptions/graph"

type Props = {
  analytics: any
}

const CurrentMonth: React.FunctionComponent<Props>= ({analytics}) => {
    return (
      <div className="profile-box-form">
        <div>
          <p className="form-login-title green px20">Total Subscriptions</p>
          <p className="form-login-subtitle gray px12 mb-6px">Summary</p>
          <Subscriptions analytics={analytics}/>
          <Graph />
        </div>
      </div>
    );
};

export default CurrentMonth;

