import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EstimateForm from './components/EstimateForm';
import HistoryPage from './components/HistoryList';
import styled from 'styled-components';

const Navbar = styled.nav`
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
  border-bottom: 1.5px solid #2563eb;
`;

const NavLink = styled(Link)`
  color: #f1f5f9;
  margin: 0 1rem;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #60a5fa;
  }
`;

const App: React.FC = () => {
  // Handler for the estimate result
  const handleEstimate = (estimate: any) => {
    // Do something with the estimate, e.g., update context, show result, etc.
    console.log("Estimate completed:", estimate);
  };

  return (
    <Router>
      <Navbar>
        <h2>🚚 ShipEase</h2>
        <div>
          <NavLink to="/">Estimate</NavLink>
          <NavLink to="/history">History</NavLink>
        </div>
      </Navbar>
      <Routes>
        <Route path="/" element={<EstimateForm onEstimate={handleEstimate} />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;