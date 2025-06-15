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
  background: linear-gradient(135deg, #0f172a, #1e293b);
  padding: 3rem 1rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  color: #f1f5f9;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
`;

const HistoryPage: React.FC = () => {
  const { previousEstimates } = useAppContext();


  return (
    <PageContainer>
      <Heading>📜 Shipping History</Heading>
      <HistoryWrapper>
        {previousEstimates.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No estimates calculated yet.</p>
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
