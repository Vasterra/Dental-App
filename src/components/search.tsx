import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import Layout from 'src/components/Layout';
import Header from 'src/components/Header';
import Services from 'src/components/Search/Services';
import CardDentistComponent from 'src/components/Search/CardDentist';
import GoogleMapReactComponent from 'src/components/Search/GoogleMapReact';
import Footer from 'src/components/Footer';
import { switcher } from 'src/utils/switcher';
import { getDentist } from 'src/graphql/queries';
import { convertCityCoords } from 'src/utils/search/converCityCoords';

const Search = ({ dentistsData, listServiceForDentals }: any) => {
  const [currentDentist, setCurrentDentist] = useState();
  const [dentists, setDentists]: any = useState(dentistsData);
  const [oldDentists, setOldDentists]: any = useState(dentistsData);
  const [servicesForSearch, setServicesForSearch]: any = useState(listServiceForDentals);
  const [serviceForSearch, setServiceForSearch] = useState('choose service');
  const [distanceForSearch, setDistanceForSearch] = useState(50);
  const [ipCoords, setIpCoords] = useState();
  const [searchDentists, setSearchDentists] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchCoords, setSearchCoords]: any = useState('');

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success() {
      if (!ipCoords) {
        void convertCityCoords().then((result) => {
          setIpCoords(result);
          setSearchCoords(result);
          const findCoordinatesDent: any = findCoordinatesDentists(searchCoords ? searchCoords : result, distanceForSearch, dentistsData);
          setSearchDentists(findCoordinatesDent);
          setDentists(dentistsData);
          setOldDentists(dentistsData);
        });
      }
    };

    function error() {
      const CambridgeCoords: any = {
        lng: '0.119167',
        lat: '52.205276'
      };
      setIpCoords(CambridgeCoords);
      setSearchCoords(CambridgeCoords);
      const findCoordinatesDent: any = findCoordinatesDentists(searchCoords ? searchCoords : {
        lng: '0.119167',
        lat: '52.205276'
      }, distanceForSearch, dentistsData);
      setSearchDentists(findCoordinatesDent);
      setDentists(dentistsData);
      setOldDentists(dentistsData);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

  }, []);

  useEffect(() => {
    if (searchDentists) {
      switcher();
    } else {
      return;
    }
  }, [searchDentists]);

  const setFunctCurrentDentist = (currentDentist: any) => {
    setCurrentDentist(currentDentist);
  };

  const changeSearch = () => {
    fetch(`https://maps.google.com/maps/api/geocode/json?sensor=false&address=${searchValue}&key=AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY`)
    .then(response => response.json())
    .then(result => {
      setSearchCoords(result.results[0].geometry.location);
      const findCoordinatesDent: any = findCoordinatesDentists(result.results[0].geometry.location, distanceForSearch, dentists);
      setSearchDentists(findCoordinatesDent);
    })
    .catch((_error: any) => {
    });
  };

  const searchResult = async () => {
    let distanceDent: any = [];
    let searchDent: any[] = [];

    if (searchValue !== '') {
      fetch(`https://maps.google.com/maps/api/geocode/json?sensor=false&address=${searchValue}&key=AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY`)
      .then(response => response.json())
      .then(result => {
        setSearchCoords(result.results[0].geometry.location);
        const findCoordinatesDent: any = findCoordinatesDentists(result.results[0].geometry.location, distanceForSearch, dentists);
        setSearchDentists(findCoordinatesDent);
        setSearchValue('');
        return
      })
      .catch((error: any) => {
        console.log(error);
      });
    }

    if (serviceForSearch === 'choose service') {
      const findCoordinatesDent: any = findCoordinatesDentists(searchCoords, distanceForSearch, dentists);
      setSearchDentists(findCoordinatesDent);
    } else {
      oldDentists.forEach((item: any) => {
        searchDent.push(getDentistsFind(item));
      });
      searchDent = await Promise.all(searchDent);
      searchDent.forEach((dent: any) => {
        dent.services.items.forEach((val: { name: any; }) => {
          if (val.name === serviceForSearch) {
            const a = { 'Longitude': searchCoords.lng, 'Latitude': searchCoords.lat };
            const b = { 'Longitude': dent.lng, 'Latitude': dent.lat };
            const distanceCur = (111.111 *
              (180 / Math.PI) * (
                Math.acos(Math.cos(a.Latitude * (Math.PI / 180))
                  * Math.cos(b.Latitude * (Math.PI / 180))
                  * Math.cos((a.Longitude - b.Longitude) * (Math.PI / 180))
                  + Math.sin(a.Latitude * (Math.PI / 180))
                  * Math.sin(b.Latitude * (Math.PI / 180)))));
            if (distanceCur < distanceForSearch) {
              distanceDent.push(dent);
            }
          }
        });
        setSearchDentists(distanceDent);
      });
    }
  };

  const getDentistsFind = async (dentist: { id: any; }) => {
    const { data }: any = await API.graphql({
      query: getDentist,
      variables: {
        id: dentist.id
      },
      // @ts-ignore
      authMode: 'AWS_IAM'
    });
    return data.getDentist;
  };

  const findCoordinatesDentists = (coordinate: any, distance: number, dentists: []) => {
    let distanceDent: any[] = [];
    let sortDentist = dentists.filter((item: any) => item.hasPaidPlan === true).concat(dentists.filter((item: any) => item.hasPaidPlan !== true))
    if (!sortDentist) return {};

    sortDentist.map((dent: { lng: any; lat: any; }) => {
      const a = { 'Longitude': coordinate?.lng, 'Latitude': coordinate?.lat };
      const b = { 'Longitude': dent.lng, 'Latitude': dent.lat };
      const distanceCur = (111.111 *
        (180 / Math.PI) * (
          Math.acos(Math.cos(a.Latitude * (Math.PI / 180))
            * Math.cos(b.Latitude * (Math.PI / 180))
            * Math.cos((a.Longitude - b.Longitude) * (Math.PI / 180))
            + Math.sin(a.Latitude * (Math.PI / 180))
            * Math.sin(b.Latitude * (Math.PI / 180)))));
      if (distanceCur < distance) {
        distanceDent.push(dent);
      }
    });
    return distanceDent;
  };

  const clearSearchInput = () => {
    const clear: any = document.getElementsByClassName('clearSearchInput');
    setSearchValue('');
    clear[0].style.display = 'none';
  };

  const changeSearchValue = (e: any) => {
    const clear: any = document.getElementsByClassName('clearSearchInput');
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      clear[0].style.display = 'none';
    } else {
      clear[0].style.display = 'block';
    }
  };

  return (
    <Layout title='Search page'>
      <Header />
      <section className='container page'>
        <div className='index-box-to-box'>
          <div className='index-box-to-box-top'>
            <div className='box-left'>
              <div className='index-search-gallery'>
                <input className='search-postcode'
                       type='text'
                       id='postcode'
                       name='postcode'
                       value={searchValue}
                       onChange={(e: any) => changeSearchValue(e)}
                       placeholder=' Postcode'
                />
                <div className='clearSearchInput'>
                  <img className='form-login-input-close' src='../images/close.svg'
                       onClick={() => clearSearchInput()} />
                </div>

                <img className='search-button' src='../images/search.svg' alt='search' />
              </  div>
              <p className='row-content-index'>
                {servicesForSearch &&
                <Services
                  services={servicesForSearch}
                  setServiceForSearch={setServiceForSearch}
                />}
              </p>
              <p className='row-content-index'>
                <select className='index-select arrows' name='services' id='services'
                        onChange={(e: any) => setDistanceForSearch(e.target.value)}
                >
                  <option value='50'>Within: 50 Miles
                  </option>
                  <option value='1'>Within: 1 Mile</option>
                  <option value='5'>Within: 5 Miles</option>
                  <option value='10'>Within: 10 Miles</option>
                  <option value='20'>Within: 20 Miles</option>
                  <option value='30'>Within: 30 Miles</option>
                  <option value='40'>Within: 40 Miles</option>
                </select>
              </p>
              <button className='button-green-search' onClick={searchResult}>Find My Dentist</button>
            </div>
            <h1 className='title-dentist'>Find Your Dentist</h1>
            <div className='box-right'>
              <p className='switcher-text'>List Search</p>
              <p className='switcher'>
                <span className='switcher-dot' />
              </p>
              <p className='switcher-text strong'>Map Search</p>
            </div>
          </div>
        </div>
        <div className='index-box-to-box'>
          <div className='main-index  index-main-box left-size'>
            {/*{!searchDentists && <WrapperFlex><CircularProgress size={120}/></WrapperFlex>}*/}
            {searchDentists &&
            <GoogleMapReactComponent
              dentists={searchDentists}
              currentDentist={currentDentist}
              searchCoords={searchCoords}
              ipCoords={ipCoords}
            />}
          </div>
          <div className='main-index index-main-box right-size'>
            {/*{!searchDentists && <WrapperFlex><CircularProgress size={120}/></WrapperFlex>}*/}
            <div className='index-gallery-box'>
              {searchDentists &&
              searchDentists.map((dentist: any, key: any) => {
                return (
                  <CardDentistComponent
                    key={key}
                    dentist={dentist}
                    setCurrentDentist={setFunctCurrentDentist}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </Layout>
  );
};

export default Search;