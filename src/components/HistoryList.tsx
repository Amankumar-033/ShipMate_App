 /*

  This is the HistoryPage component that displays the shipping history of previous estimates.
  It uses styled-components for styling and fetches data from the AppContext.
  It maps through the previous estimates and displays each one using the Result component, 
  which formats the shipping details in a card layout. If there are no estimates, it shows a message indicating that no

 */


import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Result from './Results';

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
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  width: 35%;

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 85%;
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 1.5rem 0.8rem;
  }
`;

const Heading = styled.h1`
  color: #f1f5f9;
  font-size: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const CardWrapper = styled.div`
  background: #334155;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  color: #f1f5f9;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.85rem;
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

      {previousEstimates.length === 0 ? (
        <NoEstimatesText>No estimates calculated yet.</NoEstimatesText>
      ) : (
        <HistoryWrapper>
          {previousEstimates.map((est: Estimate, index: number) => (
            <CardWrapper key={index}>
              <Result weightUnit={'kg'} {...est} />
            </CardWrapper>
          ))}
        </HistoryWrapper>
      )}
    </PageContainer>
  );
};

export default HistoryPage;
