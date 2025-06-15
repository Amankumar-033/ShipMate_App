import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EstimateForm from './components/EstimateForm';
import HistoryPage from './components/HistoryList';
import styled from 'styled-components';

const Navbar = styled.nav`
  background: #1e293b;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
        <Route path="/" element={<EstimateForm />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
