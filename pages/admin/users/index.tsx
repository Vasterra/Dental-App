import React, { Component } from 'react';
import Menu from "components/menu";
import ApiManager from 'services/ApiManager';

class AdminUsers extends Component {

  state: any = {
    dentists: [],
  }

  componentDidMount() {
    this.getListDentists();

  }

  async getListDentists() {
    ApiManager.getListDentists().then(listDentitst => {
      this.setState({dentists: listDentitst})
    });
  };


  clickRowOpen = (id: number) => {
    const allRow = document.getElementsByClassName('user-info');
    if (allRow[id].style.display === 'none') {
      allRow[id].style.display = 'block';
    } else {
      allRow[id].style.display = 'none';
    }
  };

  render() {
    console.log(this.state.dentists)
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
              <input className='search-users' type='search' id='search' name='search' value=''
                     placeholder=' Search users'/>
              <img className='search-button' src='../../../images/search.svg' alt='search'/>
            </div>

            <div className='user-list-header'>
              <div className='form-profile-label'>Dentist</div>
              <div className='form-profile-label select-area' id='account_opened'>Account Opened
                <ul className='account_opened'>
                  <li>Last Week</li>
                  <li>Last Month</li>
                  <li>Last 3 Months</li>
                  <li>Last 6 Months</li>
                  <li>Last Year</li>
                </ul>
              </div>
              <div className='form-profile-label select-area' id='status'>Status
                <ul className='status'>
                  <li>Paid</li>
                  <li>Free</li>
                </ul>
              </div>
              <div className='form-profile-label'></div>
              <div className='form-profile-label'>
                <img className='pl-13' src='../../../images/arrow-bottom.svg' alt='arrow bottom'/>
              </div>
            </div>

            {
              this.state.dentists.map((item: any, key: any) => {
                return (<div className='user-block'>
                  <div className='user-list user-list-text bg-white user-data'>
                    <p>{item.firstName}</p>
                    <p>{item.createdAt}</p>
                    <p>Paid Subscription Ends: 03/09/2021</p>
                    <a className='row'>
                      <img src='../../../images/user.svg'/>
                      <span>View Profile</span>
                    </a>
                    <p>
                      <img className='open-user-profile open-info' src='../../../images/plus.svg'
                           onClick={() => this.clickRowOpen(key)}/>
                    </p>
                  </div>
                  <div className='user-info-text bg-green user-info'>
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
                </div>)
              })
            }
          </div>
        </div>
      </section>
    );
  }
};

export default AdminUsers;
