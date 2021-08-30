import styled from 'styled-components';

export const ButtonRedOutline = styled('button')`
  cursor: pointer;
  background-color: var(--color-red);
  color: var(--color-white);
  margin: 20px 20px 0 0;
  max-width: 180px;
  padding: 13px 30px;
  box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
  font-family: PT Sans;
  font-size: 9px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  text-align: center;
  border-radius: 20px;
  border: solid 2px var(--color-red);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  transition: background .3s linear;
  
  &:hover {
   opacity: 0.8;
    //background-color: var(--color-white);
    //border: solid 2px var(--color-red);
    //color: var(--color-black);
  }
`;