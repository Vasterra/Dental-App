import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #F0F0F0 0% 0% no-repeat padding-box;
  }
  
  p {
    margin: 0;
    padding: 0;
  }
`;