
/*
  This file is part of the  project: ShipMate - A Shipping Cost Estimator
*/


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import GlobalStyles from './styles/GlobalStyles';
import 'leaflet/dist/leaflet.css';




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStyles />
      <App />
    </AppProvider>
  </React.StrictMode>
);
