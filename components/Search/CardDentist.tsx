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
    <CardWrapper>
      <FlexWrapper>
        <Grid container spacing={3}>
          {dentists.map((data: any, key) => {
              return (
                <Grid item xs={12} sm={6} lg={3} key={key}>
                  <CardBlock key={data.name} onClick={() => setCurrentDentist(data)}>
                    <div className="water">
                      {/*<img className="image" src="/zub.jpeg" alt="image"/>*/}
                      <CardDentistImage data={data}/>
                      {/*<button className="block-button"><span*/}
                      {/*  className="block-button-text center"> View BeforeImage</span>*/}
                      {/*</button>*/}
                      {/*<span className="watermark">watermark</span>*/}
                    </div>
                    <ImageDescription>
                      <Avatar data={data}/>
                      <TitleDescription>
                        {data.name}<br/>
                        <SubtitleDescription>21 km away</SubtitleDescription>
                      </TitleDescription>
                      <ButtonBig>
                        <a href={"../../dentist/account/" + data.id} target="_blank">Veiw Profile</a>
                      </ButtonBig>
                    </ImageDescription>
                  </CardBlock>
                </Grid>
              )
            }
          )}
        </Grid>
      </FlexWrapper>
    </CardWrapper>
  )
}

export default CardDentistComponent;
