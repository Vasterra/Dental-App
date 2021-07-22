import React from "react";
import styled from "styled-components";

const Typography = styled("h1")`
  text-transform: uppercase;
  font: normal normal normal 47px Roboto;
`;

type Props = {
    title: string,
}

 const TypographyComponent: React.FunctionComponent<Props> = ({title}) => {
    return (
        <Typography>
            {title}
        </Typography>
    )
}
export default TypographyComponent
