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
  dentists: [],
  label: string;
  searchCoords: [],
  currentDentist: {},
  ipCoords: {},
}

class GoogleMapReactComponent extends React.Component<Props & GeolocatedProps> {

  render() {
    let centerMe = {};

    if (this.props.ipCoords) {
      // @ts-ignore
      const {lat, lng} = this.props.ipCoords
      centerMe = {
        lat,
        lng
      }
    }
    if (this.props.searchCoords) {
      // @ts-ignore
      const {lat, lng} = this.props.searchCoords
      centerMe = {
        lat,
        lng
      }
    }

    if (this.props.currentDentist) {
      // @ts-ignore
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
              lat={centerMe?.lat}
              // @ts-ignore
              lng={centerMe?.lng}
              text={'Me'}
            />
            {this.props.dentists !== undefined ? this.props.dentists.map((dent, key) => {
              const {lat, lng, name} = dent;
              // @ts-ignore
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
