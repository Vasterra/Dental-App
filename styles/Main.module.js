import styled from "styled-components";

export const Container = styled("div")`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

export const Row = styled("div")`
  display: flex;
`;

export const Col = styled("div")`
  width: 100%;
  max-width: 100%;
  height: 100vh;
`;

export const RightSide = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Image = styled("div")`
  background-image: url(https://source.unsplash.com/random);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
`;