import React, {Component, useEffect, useState} from 'react';
import Menu from "src/components/menu";
import ApiManager from 'src/services/ApiManager';
import Error from "next/error"
import {motion} from "framer-motion"
import moment from "moment"

const AdminUsers = () => {
  const [dentists, setDentists]: any = useState();
  const [oldDentists, setOldDentists]: any = useState();
  const [userInfoShow, setUserInfoShow]: any = useState(false);
  const [searchValue, setSearchValue]: any = useState();

  const variants = {
    visible: {opacity: 1, height: 'auto'},
    hidden: {opacity: 0, height: 0}
  }

  useEffect(() => {
    getListDentists();
  }, [])

  const getListDentists = async () => {
    try {
      ApiManager.getListDentists().then(listDentitst => {
        setDentists(listDentitst)
        setOldDentists(listDentitst)
      });
    } catch (e) {
      return <Error statusCode={404}/>
    }
  };

  const changeSearch = async (e: any) => {
    setDentists(null)
    let allDentists: any[] = []
    let result = oldDentists.map(async (item: any) => {
      if (item.firstName.toLowerCase().indexOf(e) === 0) {
        return item
      }
    })
    result = await Promise.all(result)
    result.forEach((item: string | any[]) => {
      if (item !== undefined) {
        allDentists.push(item)
      }
    })

    setDentists(allDentists)
  }


  const clickRowOpen = (id: number) => {
    const allRow: any = document.getElementsByClassName('user-info');
    if (allRow[id].style.display === 'none') {
      for (let i = 0; i < allRow.length; i++) {
        allRow[i].style.display = 'none'
      }
      allRow[id].style.display = 'block';
      setUserInfoShow(true);
    } else {
      allRow[id].style.display = 'none';
      setUserInfoShow(false);
    }
  };

  const getDate = (dentist: { createdAt: string | number | Date; }) => {
    const resultDate = new Date(dentist.createdAt)
    return `${resultDate.getDate() < 10 ?  '0' + resultDate.getDate() : resultDate.getDate()}
    .${resultDate.getMonth() < 10 ?  '0' + resultDate.getMonth() : resultDate.getMonth()}
    .${resultDate.getFullYear()}`
  }

  const filterDate = (filter: any) => {
    const currentDate = moment();
    let filteredDentists;
    if (filter === 'Last Week') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'week'));
    } else if (filter === 'Last Month') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'month'));
    } else if (filter === 'Last 3 Months') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).subtract(3, 'month'));
    } else if (filter === 'Last 6 Months') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).subtract(6, 'month'));
    } else if (filter === 'Last Year') {
      filteredDentists = oldDentists.filter((item: any) => moment(item.createdAt).isSame(currentDate, 'year'));
    }
    setDentists(filteredDentists)
  }

  const filterStatus = (status: any) => {
    let filteredDentists;
    if (status === 'Paid') {
      filteredDentists = oldDentists.filter((item: any) => item.hasPaidPlan === true);
    } else {
      filteredDentists = oldDentists.filter((item: any) => item.hasPaidPlan !== true);
    }
    setDentists(filteredDentists)
  }

  return (
    <section className='container-profile'>
      <Menu active="Users"/>
      <div className='main-profile bg-white '>
        <div className='profile-box-form'>
          <div className='form-info-block'>
            <div>
              <p className='form-login-title green px20'>Users Catalogue</p>
              <p className='form-login-subtitle gray px12 mb-6px'>Search Users</p>
            </div>
          </div>
          <div className='search'>
            <input className='search-users'
                   type='search'
                   id='search'
                   name='search'
                   value={searchValue}
                   onChange={e => changeSearch(e.target.value)}
                   placeholder='Search users'/>
            <img className='search-button' src='../../../images/search.svg' alt='search'/>
          </div>
          <div className='user-list-header'>
            <div className='form-profile-label'>Dentist</div>
            <div className='form-profile-label select-area' id='account_opened'>Account Opened
              <ul className='account_opened'>
                <li onClick={() => filterDate('Last Week')}>Last Week</li>
                <li onClick={() => filterDate('Last Month')}>Last Month</li>
                <li onClick={() => filterDate('Last 3 Months')}>Last 3 Months</li>
                <li onClick={() => filterDate('Last 6 Months')}>Last 6 Months</li>
                <li onClick={() => filterDate('Last Year')}>Last Year</li>
              </ul>
            </div>
            <div className='form-profile-label select-area' id='status'>Status
              <ul className='status'>
                <li onClick={() => filterStatus('Paid')}>Paid</li>
                <li onClick={() => filterStatus('Free')}>Free</li>
              </ul>
            </div>
            <div className='form-profile-label'></div>
            <div className='form-profile-label'>
              <img className='pl-13' src='../../../images/arrow-bottom.svg' alt='arrow bottom'/>
            </div>
          </div>
          {dentists && dentists.map((item: any, key: any) => {
            return (
              <div className='user-block' key={key}>
                <div className='user-list user-list-text bg-white user-data'>
                  <p>{item.firstName}</p>
                  <p>{getDate(item)}</p>
                  <p>Paid Subscription Ends: 03/09/2021</p>
                  <a className='row'>
                    <img src='../../../images/user.svg'/>
                    <span>View Profile</span>
                  </a>
                  <p>
                    <img className='open-user-profile open-info' src='../../../images/plus.svg' onClick={() => clickRowOpen(key)} />
                  </p>
                </div>
                <motion.div animate={userInfoShow ? 'visible' : 'hidden'} variants={variants} initial='hidden'>
                  <div className='user-info-text bg-green user-info preview'>
                    <div className='flex-2-column'>
                      <div>
                        <p><strong>Account Email:</strong></p>
                        <p><strong>GDC Number:</strong></p>
                        <p><strong>Post Code:</strong></p>
                        <p><strong>Last Logged In:</strong></p>
                        <p><strong>Subscription #:</strong></p>
                        <button className='button-green-outline border-white'>Suspend</button>
                      </div>
                      <div>
                        <p>{item.email ? item.email : 'none'}</p>
                        <p>12345678</p>
                        <p>{item.postIndex ? item.postIndex : 'none'}</p>
                        <p>13:05 04/04/2021</p>
                        <p>#StripeID</p>
                        <button className='button-green-outline border-white'>Delete</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );

};

export default AdminUsers;

