import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    background: #f8f9fa;
    color: #212529;
  }
  * {
    box-sizing: border-box;
  }
  h1, h2, h3 {
    color: #007BFF;
    text-align: center;
  }
`;
export default GlobalStyles;
