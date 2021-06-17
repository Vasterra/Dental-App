import styled from "styled-components";

export const Label = styled("label")`
  text-align: left;
  font: normal normal normal 11px/15px Segoe UI;
  letter-spacing: 0;
  color: #000000;
`;

export const InputSelect = styled("p")`
  outline: none;
  margin: 0 0 15px 0;
  width: 100%;
  height: 24px;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 1px solid #0d9da6;
  padding-left: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  font: normal normal normal 11px/15px Segoe UI;
  letter-spacing: 0;
  color: #000000;
  justify-content: space-between;

  &:focus {
    background: #0d9da6;
    color: #fff;
  }
`;

export const InputFormSettings = styled("input")`
  outline: none;
  margin: 0 0 15px 0;
  width: 100%;
  height: 24px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #0d9da6;
  padding-left: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:focus {
    background: #0d9da6;
    color: #fff;
  }
`;

export const ButtonSubmitWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #0d9da6;
  padding: 15px 15px 0 15px;
`;