import styled from "styled-components";

export const ImageDescription = styled("div")`{
  padding: 10px 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

export const TitleDescription = styled("p")`{
  font: normal normal bold 15px/14px Segoe UI;
  color: #707070;
`;

export const SubtitleDescription = styled("span")`{
  text-align: left;
  font: normal normal normal 9px/11px Segoe UI;
  letter-spacing: 0px;
  color: #707070;
`;

export const CardWrapper = styled("div")`
  display: flex;
  align-items: center;
  flex-flow: wrap;
  background: transparent;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const CardBlock = styled("div")`
  background: #FFFFFF 0 0 no-repeat padding-box;
  padding: 15px;
  border-radius: 10px;
  transition: 0.3s linear;

  &:hover {
    box-shadow: 0 0 10px rgb(73, 73, 73);
  }
`;

export const FlexWrapper = styled("div")`{
  display: contents;
`;
