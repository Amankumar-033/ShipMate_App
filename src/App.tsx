import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProEstimateForm from './components/EstimateForm';
import HistoryPage from './components/HistoryList';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles'; 

const Navbar = styled.nav`
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  color: white;
  padding: 1rem 2rem; /* Default padding */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
  border-bottom: 1.5px solid #2563eb;
  z-index: 1000;    
  width: 100%;      

  @media (max-width: 768px) {
    padding: 1rem 1rem; /* Smaller padding on medium screens */
  }

  @media (max-width: 480px) {
    flex-direction: column; /* Stack items on very small screens */
    padding: 0.8rem 0.5rem;
    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    div { /* For NavLinks container */
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
`;

const NavLink = styled(Link)`
  color: #f1f5f9;
  margin: 0 1rem;
  font-weight: 500;
  text-decoration: none;
  font-size: 1.1rem; /* Default font size */

  @media (max-width: 480px) {
    margin: 0 0.5rem; /* Tighter spacing on small screens */
    font-size: 0.95rem;
  }
`;

const MainAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
`;

const ContentArea = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center; /* This keeps the form centered */
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 60%, #6366f1 100%);
  padding: 2rem 1rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;



const Footer = styled.footer`
  background-color: #1e293b;
  color: #f1f5f9;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
`;



const App: React.FC = () => {
  const handleEstimate = (estimate: any) => {
    console.log("Estimate Processing:", estimate);
  };

  return (
    <Router>
  <GlobalStyles /> 
  <MainAppWrapper>
    <Navbar>
      <h2>🚚 ShipMate</h2>
      <div>
        <NavLink to="/">Estimate</NavLink>
        <NavLink to="/history">History</NavLink>
      </div>
    </Navbar>



    
    <ContentArea>
      <Routes>
        <Route path="/" element={<ProEstimateForm onEstimate={handleEstimate} />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </ContentArea>


    
    <Footer>
      © 2025 ShipEase <br />
      Designed & Developed by Aman Kumar <br />
      📧 <a href="mailto:amanbkp9135@gmail.com" style={{ color: '#93c5fd' }}>amanbkp9135@gmail.com</a> | 
      📞 <a href="tel:+919876543210" style={{ color: '#93c5fd' }}>+91-9135896770</a>
    </Footer>
  </MainAppWrapper>
</Router>

  );
};

export default App;