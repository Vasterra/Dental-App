import React, { useEffect, useState } from 'react';
import TotalSubscription from 'src/components/dashboard/total-subscriptions';
import CurrentMonth from 'src/components/dashboard/current-month';
import ApiManager from 'src/services/ApiManager';
import Menu from 'src/components/menu';
import Error from 'next/error';
import moment from 'moment';
import { IAnalytics, IDentist, IImages, IListClosedAccounts, IListClosedSubscriptions } from '../../../types/types';
import { Auth } from 'aws-amplify';
import Router from 'next/router';

const AdminDashboard = () => {

  const [analytics, setAnalytics] = useState<IAnalytics>();

  useEffect(() => {
    // void Auth.currentAuthenticatedUser().then(result => {
    //   console.log(result.signInUserSession.accessToken.payload["cognito:groups"][0] !== 'admin');
    //   if (result.signInUserSession.accessToken.payload["cognito:groups"][0] !== 'admin') {
    //     void isNotAdmin()
    //   }
    // });
    setTimeout(() => {
      getListDentists();
    }, 1000);
  }, []);

  // const isNotAdmin = async () => {
  //   await Router.replace('/');
  //   await Auth.signOut();
  // }

  const getListDentists = () => {
    const currentDate = moment();
    try {
      void ApiManager.GET_LIST_DENTIST().then((listDentists: IDentist[]) => {
        void ApiManager.GET_LIST_IMAGES().then((listImages: IImages[]) => {
          console.log(listImages);
          void ApiManager.GET_LIST_CLOSED_ACCOUNTS().then((listClosedAccounts: IListClosedAccounts[]) => {
            void ApiManager.GET_LIST_CLOSED_SUBSCRIPTIONS().then((listClosedSubscriptions: IListClosedSubscriptions[]) => {
              return setAnalytics({
                totalSubscriptions: listDentists.filter((item: any) => item.hasPaidPlan).length,
                totalFreeAccounts: listDentists.filter((item: any) => !item.hasPaidPlan).length,
                totalSubscriptionsClosed: listClosedSubscriptions.length,
                totalAccountsClosed: listClosedAccounts.length,
                totalImagesUploaded: listImages ? listImages.length * 2 : 0,
                monthNewSubscriptions: listDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month') && item.hasPaidPlan).length,
                monthNewFreeAccounts: listDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month') && !item.hasPaidPlan).length,
                monthSubscriptionsClosed: listClosedSubscriptions.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month')).length,
                monthAccountsClosed: listClosedAccounts.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month')).length,
                monthImagesUploaded: listImages ? listImages.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month')).length * 2 : 0
              });
            });
          });
        });
      });
    } catch (e: any) {
      return <Error statusCode={404} />;
    }
  };

  const filterAnalytics = (year: any) => {
    console.log(year);
    console.log(analytics);
  };

  return (
    <section className='container-profile'>
      <Menu active='Dashboard' />
      <div className='main-profile bg-white'>
        <CurrentMonth analytics={analytics} />
        <TotalSubscription analytics={analytics} filterAnalytics={filterAnalytics} />
      </div>
    </section>
  );
};

export default AdminDashboard;
