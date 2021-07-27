import React from "react";
import styled from "styled-components";

const DentistAvatarBlockEmpty = styled("div")`
  display: block;
  background-color: #0d9da6;
  width: 150px;
  height: 150px;
  margin: 15px;
  border-radius: 50%;
  border: 1px solid #0d9da6;
`;

const AvatarProfileComponent = () => {
  return (
    <DentistAvatarBlockEmpty/>
  )
}

export default AvatarProfileComponent