import React from "react";
import styled from "styled-components";
// @ts-ignore
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";
import MeMarket from "./MeMarker";
import {geolocated, GeolocatedProps} from "react-geolocated";

const SearchPanelWrapper = styled("div")`
  display: flex;
  align-items: center;
  flex-flow: wrap;
  background: #FFFFFF 0 0 no-repeat padding-box;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
`;

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
        lat,
        lng
      }
    }
    if (this.props.searchCoords) {
      const {lat, lng} = this.props.searchCoords
      centerMe = {
        lat,
        lng
      }
    }

    if (this.props.currentDentist) {
      const {lat, lng} = this.props.currentDentist
      centerMe = {
        lat,
        lng
      }
    }
    return (
      <SearchPanelWrapper>
        <div style={{height: '300px', width: '100%'}}>
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
            {this.props.dentists !== undefined ? this.props.dentists.map((dent: { lat: any; lng: any; name: any; }, key: React.Key | null | undefined): any => {
              const {lat, lng, name} = dent;
              return <Marker
                // @ts-ignore
                lat={lat}
                lng={lng}
                key={key}
                text={name}
                selected={dent === this.props.currentDentist}
              />
            }) : <></>
            }
          </GoogleMapReact>
        </div>
      </SearchPanelWrapper>
    )
  }
}

export default geolocated()(GoogleMapReactComponent);
