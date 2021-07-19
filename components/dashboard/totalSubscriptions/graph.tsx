import React from "react";

const Graph = ({}) => {
  return (
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
  );
};

export default Graph;

