import {API} from "aws-amplify";
import React, {Component} from "react";
import styled from "styled-components";
import {CircularProgress} from "@material-ui/core";

import Layout from "components/Layout";
import Header from "components/Header";
import Services from "components/Search/Services";
import CardDentistComponent from "components/Search/CardDentist";
import GoogleMapReactComponent from "components/Search/GoogleMapReact";
import Footer from "components/Footer";

import ApiManager from "services/ApiManager";
import {switcher} from "../utils/switcher";
import {getDentist, listDentists, listServiceForDentals,} from "../graphql/queries";
import {convertCityCoords} from "../utils/search/converCityCoords";


class Search extends Component {
  state: any = {
    services: null,
    service: null,
    servicesForSearch: null,
    dentists: null,
    currentDentist: null,
    ipCoords: null,
    searchDentists: null,
    valueSlider: 50,
    searchCoords: null,
    searchValue: null,
    serviceSearch: null,
  }

  async componentDidMount() {
    switcher();
    if (!this.state.ipCoords) {
      convertCityCoords().then((result) => {
        this.setState({ipCoords: result})
        if (!this.state.searchCoords) {
          this.setState({searchCoords: result})
        }
      })
    }
    await this.getListDentists(null);
    await this.getListServiceForDentals();
  }

  async getListDentists(service: any) {
    this.setState({dentists: null})
    console.log('service', service)
    this.setState({service: service})
    ApiManager.getListDentists().then(listDentitst => {
      const findCoordinatesDent = this.findCoordinatesDentists(this.state.searchCoords, this.state.valueSlider, listDentitst)
      this.setState({dentists: listDentitst})
      this.setState({searchDentists: findCoordinatesDent})
    });
  }

  async getListServiceForDentals() {
    ApiManager.getListServiceForDentals().then(listServiceForDentals => {
      this.setState({servicesForSearch: listServiceForDentals})
    })
  }

  async setFindDentist(findDentist: any) {
    this.setState({searchDentists: null})
    const findCoordinatesDent = this.findCoordinatesDentists(this.state.searchCoords, this.state.valueSlider, findDentist)
    this.setState({searchDentists: findCoordinatesDent})
  }

  enterKeyDown = (e: { keyCode: number; }) => {
    if (e.keyCode === 13) this.changeSearch()
  }

  handleBlur = () => {
    if (this.state.valueSlider < 0) {
      this.setState({valueSlider: 0})
    } else if (this.state.valueSlider < 100) {
      this.setState({valueSlider: 100})
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({valueSlider: event.target.value === '' ? '' : Number(event.target.value)})
  };

  getDentistForService = (dentists: any) => {
    this.setState({searchDentist: dentists})
  }

  setCurrentDentist = (currentDentist: any) => {
    this.setState({currentDentist: currentDentist})
  }

  setSearchService = (service: any) => {
    console.log(service)
    this.setState({serviceSearch: service})
  }

  changeSearch = () => {
    fetch('https://maps.google.com/maps/api/geocode/json?sensor=false&address=' + this.state.searchValue + '&key=AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY')
      .then(response => response.json())
      .then(result => {
        this.getListDentists(null)
        this.setState({searchCoords: result.results[0].geometry.location})
        this.getDistance({}, this.state.valueSlider, result.results[0].geometry.location, this.state.dentists)
      })
      .catch((_error: any) => {
      })
  }

  async onChangeDistance(e: any) {
    this.setState({valueSlider: e.target.value})
    let distanceDent: any[] = [];
    let searchDent: any[] = [];
    console.log(this.state.service === 'choose service')
    if (this.state.service === 'choose service') {
      const findCoordinatesDent = this.findCoordinatesDentists(this.state.searchCoords, e.target.value, this.state.dentists)
      this.setState({searchDentists: findCoordinatesDent})
      this.setState({service: null})
    } else {
      console.log(this.state.dentists)
      this.state.dentists.forEach((item: any) => {
        searchDent.push(this.getDentistsFind(item))
      })
      searchDent = await Promise.all(searchDent)
      searchDent.forEach((dent: { services: { items: { name: any; }[]; }; lng: any; lat: any; }) => {
        dent.services.items.forEach((val: { name: any; }) => {
          console.log(this.state.serviceSearch)
          console.log(val.name)
          if (val.name === this.state.serviceSearch) {
            const a = {'Longitude': this.state.searchCoords.lng, 'Latitude': this.state.searchCoords.lat};
            const b = {'Longitude': dent.lng, 'Latitude': dent.lat};
            const distanceCur = (111.111 *
              (180 / Math.PI) * (
                Math.acos(Math.cos(a.Latitude * (Math.PI / 180))
                  * Math.cos(b.Latitude * (Math.PI / 180))
                  * Math.cos((a.Longitude - b.Longitude) * (Math.PI / 180))
                  + Math.sin(a.Latitude * (Math.PI / 180))
                  * Math.sin(b.Latitude * (Math.PI / 180)))))
            if (distanceCur < e.target.value) {
              distanceDent.push(dent)
            }
          }
        })
        this.setState({searchDentists: distanceDent})
      })
    }
  }

  getDentistsFind = async (dentist: { id: any; }) => {
    const {data}: any = await API.graphql({
      query: getDentist,
      variables: {
        id: dentist.id
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    return data.getDentist
  }

  getDistance = (_event: any, newValue: any, coordinate?: object | undefined, searchDent?: object): any => {
    console.log(searchDent)

    let searchD: any = [];
    let coordinates: any = {};

    if (searchDent) {
      searchD = searchDent
    } else {
      searchD = this.state.searchDentists
    }

    if (coordinate) {
      coordinates = coordinate
    } else {
      coordinates = this.state.searchCoords
    }
    if (!searchD) return
    const findCoordinatesDent: any = this.findCoordinatesDentists(coordinates, newValue, searchD)
    console.log(findCoordinatesDent)
    this.setState({searchDentists: findCoordinatesDent})
  }

  findCoordinatesDentists = (coordinate: any, distance: number, dentists: []): object | [] => {
    let distanceDent: any[] = [];

    if (!dentists) return {}

    dentists.map((dent: { lng: any; lat: any; }) => {
      const a = {'Longitude': coordinate?.lng, 'Latitude': coordinate?.lat};
      const b = {'Longitude': dent.lng, 'Latitude': dent.lat};
      const distanceCur = (111.111 *
        (180 / Math.PI) * (
          Math.acos(Math.cos(a.Latitude * (Math.PI / 180))
            * Math.cos(b.Latitude * (Math.PI / 180))
            * Math.cos((a.Longitude - b.Longitude) * (Math.PI / 180))
            + Math.sin(a.Latitude * (Math.PI / 180))
            * Math.sin(b.Latitude * (Math.PI / 180)))))
      if (distanceCur < distance) {
        distanceDent.push(dent)
      }
    })
    return distanceDent
  }

  render() {
    return (
      <Layout title="Search page">
        <Header/>
        <section className="container page">
          <div className="index-box-to-box">
            <div className="index-box-to-box-top">
              <div className="box-left">
                <div className="index-search-gallery ">
                  <input className="search-postcode"
                         type="search"
                         id="postcode"
                         name="postcode"
                         value={this.state.searchValue}
                         onChange={e => this.setState({searchValue: e.target.value})}
                         onKeyDown={this.enterKeyDown}
                         placeholder=" Postcode"
                  />
                  <img className="search-button" src="../images/search.svg" alt="search"/>
                </div>
                <p className="row-content-index">
                  {this.state.servicesForSearch &&
                  <Services
                      setFindDentist={this.setFindDentist.bind(this)}
                      getListDentists={this.getListDentists.bind(this)}
                      setSearchService={this.setSearchService.bind(this)}
                      services={this.state.servicesForSearch}
                      searchCoords={this.state.searchCoords}
                      dentists={this.state.dentists}
                  />}
                </p>
                <p className="row-content-index">
                  <select className="index-select arrows" name="services" id="services"
                          onChange={this.onChangeDistance.bind(this)}>
                    <option value="50"
                      // @ts-ignore
                            disabled="" selected=""
                    >Within: 50 Miles
                    </option>
                    <option value="1">Within: 1 Mile</option>
                    <option value="5">Within: 5 Miles</option>
                    <option value="10">Within: 10 Miles</option>
                    <option value="20">Within: 20 Miles</option>
                    <option value="30">Within: 30 Miles</option>
                    <option value="40">Within: 40 Miles</option>
                  </select>
                </p>
              </div>
              <h1 className="title-dentist">Find Your Dentist</h1>
              <div className="box-right">
                <p className="switcher-text">List Search</p>
                <p className="switcher">
                  <span className="switcher-dot"></span>
                </p>
                <p className="switcher-text strong">Map Search</p>
              </div>
            </div>
          </div>
          <div className="index-box-to-box">
            <div className="main-index  index-main-box left-size">
              {this.state.searchDentists &&
              <GoogleMapReactComponent
                  dentists={this.state.searchDentists}
                  me={this.state.searchDentists[0]}
                  currentDentist={this.state.currentDentist}
                  searchCoords={this.state.searchCoords}
                  ipCoords={this.state.ipCoords}
              />}
            </div>
            <div className="main-index index-main-box right-size">
              <div className="index-gallery-box">
                {this.state.searchDentists &&
                this.state.searchDentists.map((dentist: any, key: any) => {
                  return (
                    <CardDentistComponent
                      key={key}
                      dentist={dentist}
                      setCurrentDentist={this.setCurrentDentist}
                    />
                  )
                })
                }
              </div>
            </div>
          </div>
          <Footer/>
        </section>
      </Layout>
    )
  }
}

export default Search;