import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Base font size for rem units, easier scaling */
  html {
    font-size: 16px;
  }

  /* ✅ FIXED: Don't force scrolling unless needed */
  html, body, #root { 
    min-height: 100vh;   /* Ensure full height only when needed */
    width: 100%;
    overflow-x: hidden;
    
    color: #1e293b;
    font-family: 'Poppins', Arial, sans-serif;
    line-height: 1.5;
  }

  h1, h2, h3 {
    color: #1e293b;
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.02em;
    margin: 0;
    line-height: 1.2;
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
