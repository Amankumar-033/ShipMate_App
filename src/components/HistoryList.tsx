// src/components/HistoryList.tsx
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
  min-height: 100vh;
  padding: 3rem 1rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 2rem 0.8rem;
  }
`;

const Heading = styled.h1`
  color: #f1f5f9;
  font-size: 2rem;
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
  width: 60vw;
  max-width: 1000px;
  padding-left:4rem;

  @media (max-width: 768px) {
    width: 95vw;
  }

  @media (max-width: 480px) {
    width: 100%;
    gap: 1rem;
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  background: #334155;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  color: #f1f5f9;
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
              <Result {...est} />
            </CardWrapper>
          ))}
        </HistoryWrapper>
      )}
    </PageContainer>
  );
};

export default HistoryPage;
