import React, {Component, useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import ApiManager from 'src/services/ApiManager';
import moment from "moment"

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
const DISPLAY = true;
const BORDER = true;
const CHART_AREA = true;
const TICKS = true;

const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

class Graph extends Component {

  state: any = {
    dentists: [],
    currentYear: new Date().getFullYear(),
    config: {
      type: 'line',
      width: 500,
      height: 300,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart'
          },
        }
      },
      plugins: {
        legend: false,
        title: {
          display: false,
          text: (ctx: { chart: { options: { interaction: { intersect: any; mode: any; }; }; }; }) => {
            const {intersect, mode} = ctx.chart.options.interaction;
            return 'Mode: ' + mode + ', intersect: ' + intersect;
          }
        },
      },
      scales: {
        x: {
          grid: {
            display: DISPLAY,
            drawBorder: BORDER,
            drawOnChartArea: CHART_AREA,
            drawTicks: TICKS,
          }
        },
        y: {
          grid: {
            drawBorder: false,
            color: function (context: { tick: { value: number; }; }) {
              if (context.tick.value > 0) {
                return '#707070'
              } else if (context.tick.value < 0) {
                return '#095c5c'
              }
              return '#000000';
            },
          },
        }
      }
    },
    data: {}
  }

  componentDidMount() {
    this.getListDentists();
  }

  async getListDentists() {
    ApiManager.getListDentists().then(listDentist => {
      this.filterByMonth(listDentist)
      this.setState({dentists: listDentist})
    });
  }

  filterByYear = async (year: any) => {
    this.setState({currentYear: year})
    await ApiManager.getListDentists().then(listDentist => {
      let filterYear: any;
      let filterdentistByYear: any[] = [];
      MONTHS.map((month: any, key: any) => {
        filterdentistByYear = listDentist.filter((item: any) => (year === new Date(item.createdAt).getFullYear()))
        this.filterByMonth(filterdentistByYear)
      })
    });
  }

  filterByMonth = (listDentist: any[]) => {
    const currentDate = moment();
    let subscription: any;
    let free: any;
    let subscriptionDentistsByMonths: any[] = [];
    let freeDentistsByMonths: any[] = [];

    MONTHS.map((month: any, key: any) => {
      subscription = listDentist.filter((item: any) => (key + 1 === new Date(item.createdAt).getMonth() && item.hasPaidPlan))
      free = listDentist.filter((item: any) => (key + 1 === new Date(item.createdAt).getMonth() && !item.hasPaidPlan))
      subscriptionDentistsByMonths.push(subscription.length)
      freeDentistsByMonths.push(free.length)
    })

    this.setState({
      data: {
        labels: MONTHS,
        datasets: [{
          type: 'line',
          label: 'Free Accounts',
          data: freeDentistsByMonths,
          backgroundColor: '#707070'
        }, {
          type: 'line',
          label: 'Subscriptions',
          data: subscriptionDentistsByMonths,
          backgroundColor: '#095c5c'
        }],
      }
    })
  }

  render() {
    return (
      <div className="profile-block-box">
        <div className="stripes">
          <div className="charts-block">
            <Line data={this.state.data} options={this.state.config}/>
          </div>
          <div className="years-block">
            <p className="year">{this.state.currentYear}</p>
            <p className="year-arrows">
              <img src="../../../images/arrow_left_big.svg" alt="arrow left"
                   onClick={() => this.filterByYear(this.state.currentYear - 1)}/>
              <img src="../../../images/arrow_right_big.svg" alt="arrow right"
                   onClick={() => this.filterByYear(this.state.currentYear + 1)}/>
            </p>
            <p className="circle-gray"></p>
            <p className="year-text">
              Free Accounts
            </p>
            <p className="circle-green"></p>
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

