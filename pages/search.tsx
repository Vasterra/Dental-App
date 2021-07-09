import React, {Component} from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import {convertCityCoords} from "../utils/search/converCityCoords";
import {API} from "aws-amplify";
import {listDentists, listServiceForDentals,} from "../graphql/queries";
import Services from "components/Search/Services";
import CardDentist from "components/Search/CardDentist";
import GoogleMapReactComponent from "../components/Search/GoogleMapReact";
import Footer from "components/Footer";

class Search extends Component {
  state: any = {
    services: [],
    servicesForSearch: [],
    dentists: [],
    currentDentist: null,
    ipCoords: null,
    searchDentistsLocations: null,
    searchDentists: null,
    valueSlider: 50,
    searchCoords: null,
    searchValue: null
  }

  async componentDidMount() {
    const switcher: any = document.querySelector(".switcher")
    let flag = true
    switcher.addEventListener("click", () => {
      if (flag === true) {
        switcher.style.cssText = `padding: 4px 4px 4px 4px;`
        const changeClass = document.querySelectorAll(".switcher-text")
        // @ts-ignore
        document.querySelector(".left-size").style.cssText = `display: none`
        for (let i = 0; i < changeClass.length; i++) {
          changeClass[i].classList.toggle("strong")
        }
        flag = false
      } else {
        switcher.style.cssText = `padding: 4px 4px 4px 20px;`
        const changeClass = document.querySelectorAll(".switcher-text")
        // @ts-ignore
        document.querySelector(".left-size").style.cssText = ``
        for (let i = 0; i < changeClass.length; i++) {
          changeClass[i].classList.toggle("strong")
        }
        flag = true
      }
    })
    if (!this.state.ipCoords) {
      convertCityCoords().then((result) => {
        this.setState({ipCoords: result})
        if (!this.state.searchCoords) {
          this.setState({searchCoords: result})
        }
      })
    }
    await this.getDentists();
    await this.getListServiceForDentals();
  }

  async getListServiceForDentals() {
    const {data}: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    this.setState({servicesForSearch: data.listServiceForDentals.items})
  }

  async setFindDentist(findDentist: any) {
    this.setState({dentists: findDentist})
  }

  async getDentists() {
    const {data}: any = await API.graphql({
      query: listDentists,
      // @ts-ignore
      authMode: 'AWS_IAM'
    })

    const findCoordinatesDent = this.findCoordinatesDentists(this.state.searchCoords, 100, data.listDentists.items)
    this.setState({dentists: findCoordinatesDent})
    this.setState({searchDentists: findCoordinatesDent})
  }

  enterKeyDown = (e: { keyCode: number; }) => {
    if (e.keyCode === 13) {
      this.changeSearch()
    }
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

  changeSearch = () => {
    fetch('https://maps.google.com/maps/api/geocode/json?sensor=false&address=' + this.state.searchValue + '&key=AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY')
      .then(response => response.json())
      .then(result => {
        this.setState({searchCoords: result.results[0].geometry.location})
        this.getDistance({}, this.state.valueSlider, result.results[0].geometry.location, this.state.searchDentists)
      })
      .catch((_error: any) => {
      })
  }

  getDistance = (_event: any, newValue: any, coordinate?: object | undefined, searchDent?: object) : any => {
    this.setState({valueSlider: newValue})

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
    if (!searchD) {
      return
    }

    const findCoordinatesDent: any = this.findCoordinatesDentists(coordinates, newValue, searchD)
    this.setState({dentists: findCoordinatesDent})
  }

  findCoordinatesDentists = (coordinate: any, distance: number, dentists: []): object | [] => {
    let distanceDent: any[] = [];

    if (!dentists) {
      return {}
    }

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

  onChangeDistance(e: any) {
    this.getDistance('event', e.target.value)
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
                  <input className="search-postcode" type="search" id="postcode" name="postcode" value=""
                         placeholder=" Postcode"/>
                  <img className="search-button" src="../images/search.svg" alt="search"/>
                </div>
                <p className="row-content-index">
                  <Services
                    setFindDentist={this.setFindDentist.bind(this)}
                    dentists={this.state.searchDentists}
                    getDentists={this.getDentists.bind(this)}
                    services={this.state.servicesForSearch}
                    searchDentistsLocations={this.state.searchDentistsLocations}
                    searchCoords={this.state.searchCoords}
                  />
                </p>
                <p className="row-content-index">
                  <select className="index-select arrows" name="services" id="services" onChange={this.onChangeDistance.bind(this)}>
                    <option value="50"
                      // @ts-ignore
                            disabled="" selected=""
                    >Within: 50 Miles</option>
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
              <GoogleMapReactComponent
                dentists={this.state.dentists}
                me={this.state.dentists[0]}
                currentDentist={this.state.currentDentist}
                searchCoords={this.state.searchCoords}
                ipCoords={this.state.ipCoords}
              />
              {/*<div className="map">*/}
              {/*  <iframe*/}
              {/*    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.4733956696!2d-0.24168015785324748!3d51.528558242897844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2z0JvQvtC90LTQvtC9LCDQktC10LvQuNC60L7QsdGA0LjRgtCw0L3QuNGP!5e0!3m2!1sru!2sby!4v1625735420809!5m2!1sru!2sby"*/}
              {/*    style={{width: '45vw', height: '85vh', border: 0}}*/}
              {/*    loading="lazy"></iframe>*/}
              {/*  <div className="map-dentist-block">*/}
              {/*    <img className="map-dentist-block-image" src="../images/user-image.png" alt=""/>*/}
              {/*    <p className="map-dentist-block-title">Dr Jane Doe</p>*/}
              {/*    <p className="map-dentist-block-subtitle">Address</p>*/}
              {/*  </div>*/}
              {/*  <img className="map-heart-green" src="../images/heart-green.png" alt="heart green"/>*/}
              {/*  <img className="map-heart-white" src="../images/heart-white.png" alt="heart white"/>*/}
              {/*</div>*/}
            </div>
            <div className="main-index index-main-box right-size">
              <div className="index-gallery-box">
                <CardDentist dentists={this.state.dentists} setCurrentDentist={this.setCurrentDentist}/>
              </div>
            </div>
          </div>
          <Footer />
        </section>
      </Layout>
    )
  }
}

export default Search