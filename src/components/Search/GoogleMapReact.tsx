import React from 'react';
// @ts-ignore
import GoogleMapReact from 'google-map-react';
import { customDistanceToMouse } from './helpersMap/custom_distance.js';
// @ts-ignore
import { geolocated, GeolocatedProps } from 'react-geolocated';

import Marker from './Marker';
import MeMarket from './MeMarker';

type Props = {
  dentists: any,
  searchCoords: any,
  currentDentist: any,
  ipCoords: any,
}

class GoogleMapReactComponent extends React.Component<Props & GeolocatedProps> {
  render() {
    let centerMe: any = {};

    if (this.props.ipCoords) {
      const { lat, lng } = this.props.ipCoords;
      centerMe = {
        lat: Number(lat),
        lng: Number(lng)
      };
    }
    if (this.props.searchCoords) {
      const { lat, lng } = this.props.searchCoords;
      centerMe = {
        lat: Number(lat),
        lng: Number(lng)
      };
    } else {
      centerMe = {
        lat: 52.205276,
        lng: 0.119167
      };
    }
    const onChildClick = (e: any) => {
      console.log(e);
    };

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDMYrZZhMGlK5PKOMQRQMVffXnUJwgyatY' }}
        center={centerMe}
        zoom={10}
        distanceToMouse={customDistanceToMouse}
        onChildClick={onChildClick}
      >
        <MeMarket
          // @ts-ignore
          lat={centerMe.lat}
          lng={centerMe.lng}
          text={'Me'}s
        />
        {this.props.dentists !== undefined ? this.props.dentists.map((dent: any, key: any): any => {
          return <Marker
            // @ts-ignore
            lat={dent.lat}
            lng={dent.lng}
            key={key}
            dent={dent}
            selected={dent === this.props.currentDentist}
          />;
        }) : <></>
        }
      </GoogleMapReact>
    );
  }
}

export default geolocated()(GoogleMapReactComponent);
