import React from "react"

class Marker extends React.Component {
  render() {
    // @ts-ignore
    const {selected, text} = this.props;
    let classes = 'marker';

    if (selected) {
      classes += ' selected';
    }
    return (
      <>
        return <div className={classes}>{text}</div>
        <style jsx>{`
          .marker {
            display: inline;
            background-color: white;
            border: 1px solid black;
            border-radius: 5px;
            text-align: center;
            white-space: nowrap;
            padding: 10px;
          }

          .marker.selected {
            background-color: yellow;
            border-color: black;
          }
        `}</style>
      </>
    )
  }
}

export default Marker;