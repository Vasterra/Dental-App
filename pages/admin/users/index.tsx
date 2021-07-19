import React from 'react';

const AdminUsers = () => {

  return (
    <section className='container-profile'>
      <div className='leftmenu'>
        <div className='mobile-topmenu'>
          <p className='menu' id='mobile_menu'>
            <svg className='menu-logo' xmlns='http://www.w3.org/2000/svg' height='28px' viewBox='0 0 28 20'
                 width='20px'>
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
            </svg>
          </p>
          <p>
            <a href='/'>
              <img src='../../../images/FYD4_beige-on-green@2x.png'
                   srcSet='../../../images/FYD4_beige-on-green@2x.png 2x, ../../../images/FYD4_beige-on-green@3x.png 3x'
                   className='logo-image'
              />
            </a>
          </p>
          <p>
            <img className='user-image-mobile' src='../../../images/user-image.png' alt='user image' />
          </p>
        </div>
        <div className='leftmenu-content'>
          <p>
            <a href='/'>
              <img src='../../../images/FYD4_beige-on-green@2x.png'
                   srcSet='../../../images/FYD4_beige-on-green@2x.png 2x, ../../../images/FYD4_beige-on-green@3x.png 3x'
                   className='logo-image desctop-visible'
                   alt='logo image'
              />
            </a>
          </p>
          <div className='leftmenu-user-information'>
            <img className='user-image' src='../../../images/user-image.png' alt='user image' />
            <p className='user-description white'><span>Name</span> <span>Surname</span></p>
          </div>
          <ul className='leftmenu-nav-menu'>
            <li className='leftmenu-list'>
              <a className='leftmenu-link' href='../../admin/dashboard/'>Dashboard</a>
              <img className='leftmenu-link-image' src='../../../images/dashboard.svg' alt='link image' />
            </li>
            <li className='leftmenu-list active'>
              <a className='leftmenu-link' href='../../admin/users/'>Users</a>
              <img className='leftmenu-link-image' src='../../../images/user.svg' alt='link image' />
            </li>
            <li className='leftmenu-list'>
              <a className='leftmenu-link' href='../../admin/settngs/'>Settings</a>
              <img className='leftmenu-link-image' src='../../../images/more_vert.svg' alt='link image' />
            </li>
            <li className='leftmenu-list logout'>
              <a className='leftmenu-link bold' href='#'>Logout</a>
              <img className='leftmenu-link-image' src='../../../images/left-arrow.svg' alt='link image' />
            </li>
            <li className='fill-mobile'></li>
          </ul>
        </div>
      </div>
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
                   placeholder=' Search users' />
            <img className='search-button' src='../../../images/search.svg' alt='search' />
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
              <img className='pl-13' src='../../../images/arrow-bottom.svg' alt='arrow bottom' />
            </div>
          </div>

          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' />
                <span>View Profile</span>
              </p>
              <p>
                <img className='open-user-profile open-info' src='../../../images/plus.svg' />
              </p>
            </div>
            <div className='user-info-text  bg-green user-info'>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>

          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' /> <span>View Profile</span></p>
              <p><img className='open-user-profile open-info' src='../../../images/plus.svg' /></p>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>

          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' /> <span>View Profile</span></p>
              <p><img className='open-user-profile open-info' src='../../../images/plus.svg' /></p>
            </div>
            <div className='user-info-text  bg-green user-info'>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>


          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' /> <span>View Profile</span></p>
              <p><img className='open-user-profile open-info' src='../../../images/plus.svg' /></p>
            </div>
            <div className='user-info-text  bg-green user-info'>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' /> <span>View Profile</span></p>
              <p><img className='open-user-profile open-info' src='../../../images/plus.svg' /></p>
            </div>
            <div className='user-info-text  bg-green user-info'>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' /> <span>View Profile</span></p>
              <p><img className='open-user-profile open-info' src='../../../images/plus.svg' /></p>
            </div>
            <div className='user-info-text  bg-green user-info'>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' /> <span>View Profile</span></p>
              <p><img className='open-user-profile open-info' src='../../../images/plus.svg' /></p>
            </div>
            <div className='user-info-text  bg-green user-info'>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>


          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' /> <span>View Profile</span></p>
              <p><img className='open-user-profile open-info' src='../../../images/plus.svg' /></p>
            </div>
            <div className='user-info-text  bg-green user-info'>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' /> <span>View Profile</span></p>
              <p><img className='open-user-profile open-info' src='../../../images/plus.svg' /></p>
            </div>
            <div className='user-info-text  bg-green user-info'>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>


          <div className='user-block'>
            <div className='user-list user-list-text bg-white user-data'>
              <p>Name</p>
              <p>01.01.2021</p>
              <p>Paid Subscription Ends: 03/09/2021</p>
              <p className='row'><img src='../../../images/user.svg' /> <span>View Profile</span></p>
              <p><img className='open-user-profile open-info' src='../../../images/plus.svg' /></p>
            </div>
            <div className='user-info-text  bg-green user-info'>
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
                  <p>Email</p>
                  <p>12345678</p>
                  <p>Post Code</p>
                  <p>13:05 04/04/2021</p>
                  <p>#StripeID</p>
                  <button className='button-green-outline border-white'>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUsers;
