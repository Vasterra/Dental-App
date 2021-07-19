import React from "react";
import Menu from "components/menu";
import CurrentMonth from "components/dashboard/current-month";
import TotalSubscription from "components/dashboard/total-subscriptions";

const AdminDashboard = () => {

  return (
    <section className="container-profile">
      <Menu active="Dashboard"/>
      <div className="main-profile bg-white">
        <CurrentMonth />
        <TotalSubscription />
      </div>
    </section>
  );
};

export default AdminDashboard;
