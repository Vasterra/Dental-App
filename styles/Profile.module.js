import styled from "styled-components";

export const ListWrapper = styled("div")`{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Input = styled("input")`{
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin: 10px;
  width: 250px;

  &:active {
    & + span {
      width: 100%;
    }
  }
}`;

export const ConfirmButton = styled("button")`{
  width: 170px;
  cursor: pointer;
  background: #fff;
  height: 37px;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  color: #000;

  &:hover {
    background: #0d9da6;
    color: #fff;
  }

  &:disabled {
    background: gray;
    border: 1px solid gray;
    color: #000000;
    cursor: default;
  }
`;

export const Item = styled("button")`{
  width: 250px;
  cursor: pointer;
  background: #fff;
  border-radius: 30px;
  border: 1px solid #0d9da6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 5px;
  color: #000;

  &:hover {
    background: #0d9da6;
    color: #fff;
  }
`;