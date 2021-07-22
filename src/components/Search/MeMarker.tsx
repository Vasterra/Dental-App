import React from "react"
import SvgIcon, {SvgIconProps} from '@material-ui/core/SvgIcon';
import styled from "styled-components";

const MeMarkerWrapper = styled("div")`
  z-index: 1;
  color: #3f51b5;
`;

class MeMarket extends React.Component {
  render() {

    function HomeIcon(props: SvgIconProps) {
      return (
        <SvgIcon {...props}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
      );
    }

    return (
      <MeMarkerWrapper>
        <HomeIcon/>
      </MeMarkerWrapper>
    )
  }
}

export default MeMarket;