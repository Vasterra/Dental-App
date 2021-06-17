import styled from "styled-components";

export const CardBlock = styled("div")`
  padding: 10px 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #F0F0F0 0 0 no-repeat padding-box;
  border-radius: 10px;
  transition: 0.3s linear;

  &:hover {
    box-shadow: 0 0 10px rgb(73, 73, 73);
  }
`;

export const FlexWrapper = styled("div")`{
  display: contents;
`;
