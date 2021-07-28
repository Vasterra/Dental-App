import React, {Component, useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import ApiManager from 'src/services/ApiManager';

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
    config: {
      type: 'line',
      width:500,
      height:300,
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
            color: function(context: { tick: { value: number; }; }) {
              if (context.tick.value > 0) {
                return CHART_COLORS.green;
              } else if (context.tick.value < 0) {
                return CHART_COLORS.red;
              }
              return '#000000';
            },
          },
        }
      }
    },
    data: {
      labels: MONTHS,
      datasets: [
        {
          // label: '# of Votes',
          data: [3, 3, 3, 5, 2, 3],
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
            <Line data={this.state.data} options={this.state.config} />
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

