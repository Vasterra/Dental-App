import {API} from "aws-amplify";
import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import {CircularProgress} from "@material-ui/core";

import Layout from "src/components/Layout";
import Header from "src/components/Header";
import Services from "src/components/Search/Services";
import CardDentistComponent from "src/components/Search/CardDentist";
import GoogleMapReactComponent from "src/components/Search/GoogleMapReact";
import Footer from "src/components/Footer";

import ApiManager from "src/services/ApiManager";
import {switcher} from "src/utils/switcher";
import {getDentist, listDentists, listServiceForDentals,} from "src/graphql/queries";
import {convertCityCoords} from "src/utils/search/converCityCoords";
import { WrapperFlex } from "src/styles/Main.module";

const Search = () => {

  const [currentDentist, setCurrentDentist]: any = useState()
  const [dentists, setDentists]: any = useState()
  const [oldDentists, setOldDentists]: any = useState()
  const [services, setServices]: any = useState()
  const [service, setService]: any = useState()
  const [servicesForSearch, setServicesForSearch]: any = useState()
  const [ipCoords, setIpCoords]: any = useState()
  const [searchDentists, setSearchDentists]: any = useState()
  const [valueSlider, setValueSlider]: any = useState(50)
  const [searchValue, setSearchValue]: any = useState()
  const [searchCoords, setSearchCoords]: any = useState()
  const [switcherClick, setSwitcherClick]: any = useState()
  const [serviceSearch, setServiceSearch]: any = useState('choose service')

  useEffect(() => {
    if (!ipCoords) {
      convertCityCoords().then((result) => {
        setIpCoords(result)
        if (!searchCoords) {
          setSearchCoords(result)
          getListDentists(null, result);
          getListServiceForDentals();
        }
      })
    }
  }, [])

  useEffect(() => {
    if(searchDentists) {
      switcher();
    }
  }, [searchDentists])

  const getListDentists = async (service: any, result: any) => {
    setSearchDentists(null)
    setService(service)
    ApiManager.getListDentists().then(listDentist => {
      const findCoordinatesDent = findCoordinatesDentists(searchCoords ? searchCoords : result, valueSlider, listDentist)
      setTimeout(() => {
        setSearchDentists(findCoordinatesDent)
      }, 1000)
      setDentists(listDentist)
      setOldDentists(listDentist)
    });
  }

  const getListServiceForDentals = async () => {
    const {data}: any = await API.graphql({
      query: listServiceForDentals,
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    setServicesForSearch(data.listServiceForDentals.items)
  }

  const setFindDentist = (findDentist: any) => {
    setSearchDentists(null)
    const findCoordinatesDent = findCoordinatesDentists(searchCoords, valueSlider, findDentist)
    setTimeout(() => {
      setSearchDentists(findCoordinatesDent)
    }, 1000)
  }

  const enterKeyDown = (e: { keyCode: number; }) => {
    if (e.keyCode === 13) changeSearch()
  }

  const handleBlur = () => {
    if (valueSlider < 0) {
      setValueSlider(0)
    } else if (valueSlider < 100) {
      setValueSlider(100)
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSlider(event.target.value === '' ? '' : Number(event.target.value))
  };

  const getDentistForService = (dentists: any) => {
    setSearchDentists(dentists)
  }

  const setFunctCurrentDentist = (currentDentist: any) => {
    setCurrentDentist(currentDentist)
  }

  const handlerClickSwitch = () => {
    setSwitcherClick(true)
  }

  const setSearchService = (service: any) => {
    setServiceSearch(service)
  }

  const changeSearch = () => {
    setSearchDentists(null)
    fetch('https://maps.google.com/maps/api/geocode/json?sensor=false&address=' + searchValue + '&key=AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY')
    .then(response => response.json())
    .then(result => {
      setSearchCoords(result.results[0].geometry.location)
      const findCoordinatesDent = findCoordinatesDentists(result.results[0].geometry.location, valueSlider, dentists)
      setTimeout(() => {
        setSearchDentists(findCoordinatesDent)
      }, 1000)
    })
    .catch((_error: any) => {
    })
  }

  const onChangeDistance = async (e: any) => {
    setSearchDentists(null)
    let distanceDent: any[] = [];
    let searchDent: any[] = [];

    if (serviceSearch === 'choose service') {
      setSearchDentists(null)
      const findCoordinatesDent = findCoordinatesDentists(searchCoords, e.target.value, dentists)
      setTimeout(() => {
        setSearchDentists(findCoordinatesDent)
      }, 1000)
    } else {
      oldDentists.forEach((item: any) => {
        searchDent.push(getDentistsFind(item))
      })
      searchDent = await Promise.all(searchDent)
      searchDent.forEach((dent: any) => {
        dent.services.items.forEach((val: { name: any; }) => {
          if (val.name === serviceSearch) {
            const a = {'Longitude': searchCoords.lng, 'Latitude': searchCoords.lat};
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
        setTimeout(() => {
          setSearchDentists(distanceDent)
        }, 1000)

      })
    }
  }

  const getDentistsFind = async (dentist: { id: any; }) => {
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

  const findCoordinatesDentists = (coordinate: any, distance: number, dentists: []): object | [] => {
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
  console.log(searchDentists)
  if (!dentists) return <WrapperFlex><CircularProgress size={120}/></WrapperFlex>
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
                       value={searchValue}
                       onChange={e => setSearchValue(e.target.value)}
                       onKeyDown={enterKeyDown}
                       placeholder=" Postcode"
                />
                <img className="search-button" src="../images/search.svg" alt="search"/>
              </div>
              <p className="row-content-index">
                {servicesForSearch &&
                <Services
                    setFindDentist={setFindDentist}
                    getListDentists={getListDentists}
                    setSearchService={setSearchService}
                    services={servicesForSearch}
                    searchCoords={searchCoords}
                    dentists={dentists}
                />}
              </p>
              <p className="row-content-index">
                <select className="index-select arrows" name="services" id="services"
                        onChange={onChangeDistance}>
                  <option value="50">Within: 50 Miles
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
            { !searchDentists && <WrapperFlex><CircularProgress size={120}/></WrapperFlex>}
            {searchDentists &&
            <GoogleMapReactComponent
                dentists={searchDentists}
                me={searchDentists[0]}
                currentDentist={currentDentist}
                searchCoords={searchCoords}
                ipCoords={ipCoords}
            />}
          </div>
          <div className="main-index index-main-box right-size">
            { !searchDentists && <WrapperFlex><CircularProgress size={120}/></WrapperFlex>}
            <div className="index-gallery-box">
              { searchDentists &&
              searchDentists.map((dentist: any, key: any) => {
                return (
                  <CardDentistComponent
                    key={key}
                    dentist={dentist}
                    setCurrentDentist={setFunctCurrentDentist}
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

export default Search;