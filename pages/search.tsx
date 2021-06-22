import React, {Component, useEffect, useState} from "react";
import Layout from "../components/Layout";
import {Grid, IconButton, Input, Slider, Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {DistanceWrapper, InputSearch, Main, Profile, SearchBlock, SearchPanelWrapper} from "../styles/Search.module";
import Header from "../components/Header";
import Services from "../components/Search/Services";
import GoogleMapReactComponent from "../components/Search/GoogleMapReact";
import Drawer from "../components/Drawer";
import {convertCityCoords} from "../utils/search/converCityCoords";
import CardDentist from "../components/Search/CardDentist";
import {API} from "aws-amplify";
import {listDentists, listServices} from "../graphql/queries";

class Search extends Component {
  state: any = {
    services: [],
    dentists: [],
    currentDentist: {},
    ipCoords: {},
    searchDentistsLocations: {},
    searchDentists: {},
    valueSlider: {},
    searchCoords: {},
    searchValue: {}
  }

  async componentDidMount() {
    if (!this.state.ipCoords) {
      convertCityCoords().then((result) => {
        this.setState({ipCoords: result})
        if (!this.state.searchCoords) {
          this.setState({searchCoords: result})
        }
      })
    }
    // const services: any = await API.graphql({query: listServices})
    // this.setState({services: services.data.listServices.items})
    await this.getDentist();
  }

  async getDentist() {

    const dentists: any = await API.graphql({
      query: listDentists,
      // @ts-ignore
      authMode: 'AWS_IAM'
    })
    console.log(dentists)
    this.setState({dentists: dentists.data.listDentists.items})
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

  setCurrentDentist = (currentDentist) => {
    this.setState({currentDentist: currentDentist})
  }

  changeSearch = () => {
    fetch('https://maps.google.com/maps/api/geocode/json?sensor=false&address=' + this.state.searchValue + '&key=AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY')
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({searchCoords: result.results[0].geometry.location})
        this.getDistance({}, this.state.valueSlider, result.results[0].geometry.location, this.state.searchDentists)
      })
      .catch((_error: any) => {
      })
  }

  getDistance = (_event: any, newValue: any, coordinate?: object | undefined, searchDent?: object) => {
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
      return {};
    }

    dentists.map((dent: { lng: any; lat: any; }) => {
      const a = {'Longitude': coordinate.lng, 'Latitude': coordinate.lat};
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
        <Profile>
          <Drawer/>
          <Main>
            <SearchPanelWrapper>
              <Grid container alignItems="center" justify="space-between" spacing={2}>
                <Grid item xs={12} sm={6} lg={3}>
                  <SearchBlock>
                    <IconButton
                      onClick={this.changeSearch}
                      aria-label="search"
                      style={{width: '32px', height: '32px', zoom: 1.6, color: '#0d9da6'}}>
                      <SearchIcon/>
                    </IconButton>
                    <InputSearch
                      placeholder="Search Google Maps"
                      onChange={e => this.setState({searchValue: e.target.value})}
                      onKeyDown={this.enterKeyDown}
                    />
                  </SearchBlock>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Services
                    getDentist={this.getDentistForService}
                    dentists={this.state.searchDentists}
                    services={this.state.services}
                    searchDentistsLocations={this.state.searchDentistsLocations}
                    searchCoords={this.state.searchCoords}
                  />
                </Grid>
                <Grid item xs={12} lg={3}>
                  <DistanceWrapper>
                    <Typography id="discrete-slider" gutterBottom>
                      Distance
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs>
                        <Slider
                          value={typeof this.state.valueSlider === 'number' ? this.state.valueSlider : 0}
                          aria-labelledby="discrete-slider"
                          // @ts-ignore
                          onChange={this.getDistance}
                        />
                      </Grid>
                      <Grid item xs>
                        <Input
                          value={this.state.valueSlider}
                          margin="dense"
                          onChange={this.handleInputChange}
                          onBlur={this.handleBlur}
                          inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                          }}
                        />
                      </Grid>
                    </Grid>
                  </DistanceWrapper>
                </Grid>
                <Grid item lg={2}>
                </Grid>
              </Grid>
            </SearchPanelWrapper>
            <GoogleMapReactComponent
              dentists={this.state.dentists}
              me={this.state.dentists[0]}
              currentDentist={this.state.currentDentist}
              searchCoords={this.state.searchCoords}
              ipCoords={this.state.ipCoords}
            />
            <CardDentist dentists={this.state.dentists} setCurrentDentist={this.setCurrentDentist}/>
          </Main>
        </Profile>
      </Layout>
    )
  }
}

export default Search