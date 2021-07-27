import React from "react";
import styled from "styled-components";
// @ts-ignore
import GoogleMapReact from 'google-map-react';
// @ts-ignore
import {geolocated, GeolocatedProps} from "react-geolocated";

import Marker from "./Marker";
import MeMarket from "./MeMarker";

type Props = {
  me: {},
  dentists: any,
  searchCoords: any,
  currentDentist: any,
  ipCoords: any,
}

class GoogleMapReactComponent extends React.Component<Props & GeolocatedProps> {
  render() {
    let centerMe: any = {};

    if (this.props.ipCoords) {
      const {lat, lng} = this.props.ipCoords
      centerMe = {
        lat: Number(lat),
        lng: Number(lng)
      }
    }
    if (this.props.searchCoords) {
      const {lat, lng} = this.props.searchCoords
      centerMe = {
        lat: Number(lat),
        lng: Number(lng)
      }
    }

    // if (this.props.currentDentist) {
    //   const {lat, lng} = this.props.currentDentist
    //   centerMe = {
    //     lat: Number(lat),
    //     lng: Number(lng)
    //   }
    // }
    return (
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY'}}
        center={centerMe}
        zoom={10}
      >
        <MeMarket
          // @ts-ignore
          lat={centerMe.lat}
          lng={centerMe.lng}
          text={'Me'}
        />
        {this.props.dentists !== undefined ? this.props.dentists.map((dent: any, key: any): any => {
          const {lat, lng, email, address} = dent;
          return <Marker
            // @ts-ignore
            lat={lat}
            lng={lng}
            key={key}
            dent={dent}
            text={email}
            address={address}
            selected={dent === this.props.currentDentist}
          />
        }) : <></>
        }
      </GoogleMapReact>
    )
  }
}

export default geolocated()(GoogleMapReactComponent);

const SearchPanelWrapper = styled("div")`
  display: flex;
  align-items: center;
  flex-flow: wrap;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border-radius: 10px;
  width: 100%;
`;
