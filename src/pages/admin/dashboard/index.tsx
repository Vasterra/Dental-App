import React, {useEffect, useState} from "react";
import TotalSubscription from "src/components/dashboard/total-subscriptions";
import CurrentMonth from "src/components/dashboard/current-month";
import ApiManager from "src/services/ApiManager";
import Menu from "src/components/menu";
import Error from "next/error"
import moment from "moment"

const AdminDashboard = () => {

  const [analytics, setAnalytics]: any = useState();
  const MONTHS: any[string] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  useEffect(() => {
    getListDentists()
  }, [])

  const getListDentists = async () => {
    const currentDate = moment();
    try {
      ApiManager.getListDentists().then(listDentists => {
        ApiManager.getListImages().then(listImages => {
          ApiManager.GET_LIST_CLOSED_ACCOUNTS().then(listClosedAccounts => {
            ApiManager.GET_LIST_CLOSED_SUBSCRIPTIONS().then(listClosedSubscriptions => {
              setAnalytics({
                totalSubscriptions: listDentists.filter((item: any) => item.hasPaidPlan).length,
                totalFreeAccounts: listDentists.filter((item: any) => !item.hasPaidPlan).length,
                totalSubscriptionsClosed: listClosedSubscriptions.length,
                totalAccountsClosed: listClosedAccounts.length,
                totalImagesUploaded:listImages.length * 2,
                monthNewSubscriptions: listDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month') && item.hasPaidPlan).length,
                monthNewFreeAccounts: listDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month') && !item.hasPaidPlan).length,
                monthSubscriptionsClosed: listClosedSubscriptions.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month')).length,
                monthAccountsClosed: listClosedAccounts.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month')).length,
                monthImagesUploaded: listImages.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month')).length * 2,
              })
            })
          })
        })
      });
    } catch (e) {
      return <Error statusCode={404}/>
    }
  };

  return (
    <section className="container-profile">
      <Menu active="Dashboard"/>
      <div className="main-profile bg-white">
        <CurrentMonth analytics={analytics}/>
        <TotalSubscription analytics={analytics}/>
      </div>
    </section>
  );
};

export default AdminDashboard;
