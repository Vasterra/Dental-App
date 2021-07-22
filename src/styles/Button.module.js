import styled from "styled-components";

export const ButtonBig = styled("button")`{
  width: 100px;
  height: 25px;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 20px;
  font: normal normal normal 12px/21px Segoe UI;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgb(73, 73, 73);
  }
`;

export const ButtonBigGray = styled("button")`{
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
  height: 35px;
  margin-top: 20px;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 20px;
  text-align: left;
  font: normal normal normal 14px/21px Segoe UI;
  letter-spacing: 0;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #0d9da6;
    color: #fff;
`;

export const ButtonBigGreen = styled("button")`{
  cursor: pointer;
  margin: 0 10px;
  padding-left: 20px;
  padding-right: 20px;
  height: 35px;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 1px solid #0d9da6;
  border-radius: 20px;
  text-align: left;
  font: normal normal normal 14px/21px Segoe UI;
  letter-spacing: 0;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #0d9da6;
    color: #fff;
`;


export const ButtonMediumGreen = styled("button")`{
  cursor: pointer;
  width: 91px;
  height: 18px;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 1px solid #0d9da6;
  text-align: left;
  font: normal normal normal 9px/10px Segoe UI;
  letter-spacing: 0;
  color: #000;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #0d9da6;
    color: #fff;
  }
`;

export const ButtonSmallGreen = styled("button")`{
  cursor: pointer;
  padding: 2px 10px;
  margin: 0 2px;
  height: 19px;
  background: #0d9da6 0 0 no-repeat padding-box;
  border: 1px solid #0d9da6;
  text-align: left;
  font: normal normal normal 8px/10px Segoe UI;
  letter-spacing: 0;
  color: #fff;
  border-radius: 10px;
  &:hover {
    background: #fff;
    color: #0d9da6;
  }
}
`;