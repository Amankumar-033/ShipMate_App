import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: #f1f5f9;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  color: #1e293b;
`;

const Badge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  border-radius: 999px;
  font-weight: 600;
  margin-left: 0.5rem;
  background: ${({ type }) => (type === 'Express' ? '#fee2e2' : '#dbeafe')};
  color: ${({ type }) => (type === 'Express' ? '#b91c1c' : '#1e3a8a')};
`;

const Label = styled.p`
  font-weight: 500;
  margin: 0.4rem 0;
`;

interface ResultProps {
  origin: string;
  destination: string;
  distanceKm: number;
  weight: number;
  shippingOption: string;
  totalCost: number;
  currency: string;
}

const Result: React.FC<ResultProps> = ({
  origin,
  destination,
  distanceKm,
  weight,
  shippingOption,
  totalCost,
  currency,
}) => {
  const estimatedTime = shippingOption === 'Express' ? '1–2 days' : '3–5 days';
  return (
    <Card
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>📦 Estimate Summary</h3>
      <Label>
        <strong>From:</strong> {origin}
      </Label>
      <Label>
        <strong>To:</strong> {destination}
      </Label>
      <Label>
        <strong>Distance:</strong> {distanceKm.toFixed(2)} km
      </Label>
      <Label>
        <strong>Weight:</strong> {weight} kg
      </Label>
      <Label>
        <strong>Shipping Option:</strong> {shippingOption}
        <Badge type={shippingOption}>{shippingOption === 'Express' ? '⚡ Express' : '🚛 Standard'}</Badge>
      </Label>
      <Label>
        <strong>ETA:</strong> {estimatedTime}
      </Label>
      <Label>
        <strong>Total Cost:</strong> {totalCost.toFixed(2)} {currency}
      </Label>
    </Card>
  );
};

export default Result;
