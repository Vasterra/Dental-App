import React from "react";
import Menu from "src/components/menu";
import CurrentMonth from "src/components/dashboard/current-month";
import TotalSubscription from "src/components/dashboard/total-subscriptions";

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
