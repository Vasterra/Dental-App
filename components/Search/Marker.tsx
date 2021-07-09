import React from "react"
import AvatarForMap from "./AvatarForMap";

class Marker extends React.Component {
  render() {
    const {selected, text, address, dent}: any = this.props;
    let classes = 'map-heart-white';
    let icon = '../images/heart-white.png'
    let block = 'none'

    if (selected) {
      classes = 'map-heart-green';
      icon = '../images/heart-green.png';
      block = 'block';
    }
    return (
      <>
        <div style={{display: block}}>
          <div className="map-dentist-block">
            <AvatarForMap data={dent}/>
            <p className="map-dentist-block-title">{text}</p>
            <p className="map-dentist-block-subtitle">{address}</p>
          </div>
        </div>
        <img className={classes} src={icon} alt="heart green"/>
      </>
    )
  }
}

export default Marker;