import React from "react";
import CardDentistImage from "../CardDentist/Images";
import Avatar from "../CardDentist/Avatar";
import {Grid} from "@material-ui/core";
import {
  FlexWrapper,
  ImageDescription,
  CardWrapper,
  CardBlock,
  TitleDescription,
  SubtitleDescription
} from "../../styles/CardDentist.module";
import {
  ButtonBig,
} from "../../styles/Button.module";

type Props = {
  dentists: any,
  setCurrentDentist: any
}

const CardDentistComponent: React.FunctionComponent<Props> = ({dentists, setCurrentDentist}) => {
  return (
    dentists.map((data: any, key: any) => {
        return (

            <div className="index-gallery-image-box" onClick={() => setCurrentDentist(data)}>
              <CardDentistImage data={data}/>
              <p className="index-gallery-image-watermark"></p>
              <img className="index-gallery-image-watermark-img" src="../images/check_circle.svg" alt="check"/>
              {/*<a href={"../../dentist/account/" + data.id} target="_blank" key={key}>*/}
              <div className="index-gallery-image-description">
                <p className="index-gallery-image-title">Image Title</p>
                <p className="index-gallery-image-text">Image Alt Text</p>
              </div>
              {/*</a>*/}
            </div>

        )
      }
    )
  )
}

export default CardDentistComponent;
