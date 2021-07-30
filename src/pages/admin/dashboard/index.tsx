import React, {useEffect, useState } from "react";
import TotalSubscription from "src/components/dashboard/total-subscriptions";
import CurrentMonth from "src/components/dashboard/current-month";
import ApiManager from "src/services/ApiManager";
import Menu from "src/components/menu";
import Error from "next/error"

const AdminDashboard = () => {

  const [analytics, setAnalytics]: any = useState()

  useEffect(() => {
    getListAdminAnalytics()
  }, [])

  const getListAdminAnalytics = async () => {
    try {
      ApiManager.GET_ADMIN_ANALYTIC().then(listAdminAnalytics => {
        setAnalytics(listAdminAnalytics)
      });
    } catch (e) {
      return <Error statusCode={404}/>
    }
  };

  return (
    <section className="container-profile">
      <Menu active="Dashboard"/>
      <div className="main-profile bg-white">
        <CurrentMonth analytics={analytics} />
        <TotalSubscription analytics={analytics} />
      </div>
    </section>
  );
};

export default AdminDashboard;
