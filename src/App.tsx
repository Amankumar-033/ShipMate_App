// // src/App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import ProEstimateForm from './components/EstimateForm'; // Make sure this is ProEstimateForm
// import HistoryPage from './components/HistoryList'; // Assuming you have a HistoryList component
// import styled from 'styled-components';

// const Navbar = styled.nav`
//   background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
//   color: white;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
//   border-bottom: 1.5px solid #2563eb;
//   position: sticky; /* Key: Makes the navbar stick to the top */
//   top: 0;           /* Key: Tells it where to stick */
//   z-index: 1000;    /* Key: Ensures it's above other content when scrolling */
//   width: 100%;      /* Ensure it takes full width */
// `;

// const NavLink = styled(Link)`
//   color: #f1f5f9;
//   margin: 0 1rem;
//   font-weight: 500;
//   text-decoration: none;
//   &:hover {
//     color: #60a5fa;
//   }
// `;

// // This wrapper ensures the whole app takes at least 100% of the viewport height
// const MainAppWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh; /* This is crucial for controlling overall height */
// `;

// // This container will hold all scrollable content below the Navbar
// const ContentArea = styled.div`
//   flex-grow: 1; /* This makes it fill the remaining vertical space */
//   display: flex; /* Use flexbox to center content horizontally */
//   flex-direction: column; /* Allows content inside to stack vertically */
//   /* Apply the background gradient here, it will start right after the Navbar */
//   background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 60%, #6366f1 100%);
//   /* If content overflows, this container will scroll */
//   overflow-y: auto; 
//   padding-bottom: 8rem; /* ADDED THIS LINE: Adds extra scrollable space at the bottom */
// `;

// const App: React.FC = () => {
//   const handleEstimate = (estimate: any) => {
//     // This function will be called with the final estimate result
//     console.log("Estimate completed:", estimate);
//   };

//   return (
//     <Router>
//       <MainAppWrapper>
//         <Navbar>
//           <h2>🚚 ShipEase</h2>
//           <div>
//             <NavLink to="/">Estimate</NavLink>
//             <NavLink to="/history">History</NavLink>
//           </div>
//         </Navbar>
//         <ContentArea>
//           <Routes>
//             <Route path="/" element={<ProEstimateForm onEstimate={handleEstimate} />} />
//             <Route path="/history" element={<HistoryPage />} />
//           </Routes>
//         </ContentArea>
//       </MainAppWrapper>
//     </Router>
//   );
// };

// export default App;










// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProEstimateForm from './components/EstimateForm';
import HistoryPage from './components/HistoryList';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles'; 

const Navbar = styled.nav`
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
  border-bottom: 1.5px solid #2563eb;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
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

const MainAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
`;

const ContentArea = styled.div`
  flex-grow: 1; 
  display: flex; 
  flex-direction: column; 
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 60%, #6366f1 100%);
  overflow-y: auto; 
  padding-bottom: 8rem; 
`;

const App: React.FC = () => {
  const handleEstimate = (estimate: any) => {
    console.log("Estimate completed:", estimate);
  };

  return (
    <Router>
      <GlobalStyles /> 
      <MainAppWrapper>
        <Navbar>
          <h2>🚚 ShipEase</h2>
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
          {/* TEMPORARY TEST DIV: This will force the ContentArea to be very tall */}
          <div style={{ height: '2000px', background: 'transparent' }}></div>
        </ContentArea>
      </MainAppWrapper>
    </Router>
  );
};

export default App;