// src/components/HistoryList.tsx
import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Result from './Results'; // Assuming Result component is used for displaying history items

interface Estimate {
  origin: string;
  destination: string;
  weight: number;
  shippingOption: string;
  distanceKm: number;
  totalCost: number;
  currency: string;
}

const PageContainer = styled.div`
  min-height: 100vh; /* Ensures it takes at least full viewport height */
  background: linear-gradient(135deg, #0f172a, #1e293b);
  padding: 3rem 1rem; /* Default padding */
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Allow scrolling for this page if content overflows */

  @media (max-width: 768px) {
    padding: 2rem 0.8rem;
  }
`;

const Heading = styled.h1`
  color: #f1f5f9;
  font-size: 2rem; /* Default font size */
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
  }
`;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px; /* Max width for desktop */

  @media (max-width: 768px) {
    max-width: 90%; /* Adjust width for tablets */
  }

  @media (max-width: 480px) {
    max-width: 95%; /* Adjust width for mobile */
    gap: 1rem;
  }
`;

const NoEstimatesText = styled.p`
  color: #94a3b8;
  text-align: center;
  font-size: 1.1rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HistoryPage: React.FC = () => {
  const { previousEstimates } = useAppContext();

  return (
    <PageContainer>
      <Heading>📜 Shipping History</Heading>
      <HistoryWrapper>
        {previousEstimates.length === 0 ? (
          <NoEstimatesText>No estimates calculated yet.</NoEstimatesText>
        ) : (
          previousEstimates.map((est: Estimate, index: number) => (
            <Result
              key={index}
              origin={est.origin}
              destination={est.destination}
              distanceKm={est.distanceKm}
              weight={est.weight}
              shippingOption={est.shippingOption}
              totalCost={est.totalCost}
              currency={est.currency}
            />
          ))
        )}
      </HistoryWrapper>
    </PageContainer>
  );
};

export default HistoryPage;