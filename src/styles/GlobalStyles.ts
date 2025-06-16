// src/styles/GlobalStyles.tsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* IMPORTANT: Configure html, body, and the #root element for proper full-page scrolling */
  html, body, #root { 
    height: 100%; /* Ensures they take the full height of the viewport */
    width: 100%;
    /* CRITICAL: Allow vertical scrolling for the entire page if content overflows */
    overflow-y: auto;   
    /* Prevent horizontal scrolling unless explicitly needed by content */
    overflow-x: hidden; 
    
    /* Remove min-height and background from here, as App.tsx's wrappers handle these */
    /* min-height: 100vh; -- REMOVED */
    /* background: #f1f5f9; -- REMOVED */

    /* Default font and text color, can be overridden by specific components */
    color: #1e293b;
    font-family: 'Poppins', Arial, sans-serif;
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