import React, {Component, useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import ApiManager from 'services/ApiManager';

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

class Graph extends Component {

  state: any = {
    dentists: [],
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    }
  }

  componentDidMount() {
    this.getListDentists();

  }

  async getListDentists() {
    ApiManager.getListDentists().then(listDentitst => {
      this.setState({dentists: listDentitst})
    });
  }


  render() {
    return (
      <div className="profile-block-box">

        <div className="stripes">
          <div className="charts-block">
            <Line data={this.state.data} options={this.state.options}/>
          </div>

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
      </div>
    );
  }

};

export default Graph;

