import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    height: 100%;
    background: #f1f5f9;
    color: #1e293b;
    font-family: 'Poppins', Arial, sans-serif;
    min-height: 100vh;
  }
  h1, h2, h3 {
    color: #1e293b;
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.02em;
    margin: 0;
  }
  a {
    color: #2563eb;
    text-decoration: none;
    transition: color 0.2s;
  }
  a:hover {
    color: #60a5fa;
  }
  ::selection {
    background: #60a5fa44;
  }
`;

export default GlobalStyles;