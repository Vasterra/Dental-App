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

export const BlockWrapperGreen = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
`;

export const FlexWrapper = styled("section")`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const Box = styled("div")`
  max-width: 100%;
`;

export const MainContainer = styled("div")`
  width: 100%;
  padding: 10px;
  background: #F0F0F0 0 0 no-repeat padding-box;
`;

export const FormBlockWrapper = styled("div")`
  background: #FFFFFF 0 0 no-repeat padding-box;
  display: flex;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const Search = styled("div")`
  height: 47px;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CircularProgressWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Stripe = styled("div")`
  width: 229px;
  height: 0px;
  border: 1px solid #D5D5D5;
  margin: 20px 0;
`;

