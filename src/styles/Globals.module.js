import styled from 'styled-components';

export const ButtonGreen = styled('button')`
  cursor: pointer;
  background-color: var(--color-green);
  color: var(--color-white);
  white-space: nowrap;
  padding: 13px 30px;
  box-shadow: 0 2px 48px 0 rgb(0 0 0 / 8%);
  font-family: PT Sans,serif;
  font-size: 9px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  text-align: center;
  border-radius: 20px;
  border: solid 2px var(--color-green);
  display: -moz-box;
  display: flex;
  -moz-box-pack: center;
  justify-content: center;
  -moz-box-align: center;
  align-items: center;
  flex-wrap: nowrap;
  -webkit-transition: background .3s linear;
  -moz-transition: background .3s linear;
  transition: background .3s linear;
  
  :hover {
    color: var(--color-green);
    background-color: var(--color-white);
  }
`;