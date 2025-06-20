
/*
  This file is part of the Shipping Cost Estimator project.
  It provides a React component to display shipping cost estimates and route information.
  It uses styled-components for styling and framer-motion for animations.
  The component displays origin, destination, distance, weight, shipping option, estimated time of arrival (ETA), and total cost.
  It also includes a button to view the route on a map, which opens a RouteMapCard component.
*/


import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import RouteMapCard from './RouteMapCard';

const Card = styled(motion.div)`
  background: #f1f5f9;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  color: #1e293b;
  width: 100%;
  max-width: 440px;

  @media (max-width: 768px) {
    padding: 1.2rem;
    margin-top: 1.5rem;
    max-width: 90%;
  }
  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 0.8rem;
    max-width: 95%;
  }
`;

const StyledH3 = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  color: #1e293b;

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
`;

const Badge = styled.span<{ type: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  border-radius: 999px;
  font-weight: 600;
  margin-left: 0.5rem;
  flex-shrink: 0;
  gap: 0.3rem;
  background: ${({ type }) => (type === 'Express' ? '#fee2e2' : '#dbeafe')};
  color: ${({ type }) => (type === 'Express' ? '#b91c1c' : '#1e3a8a')};

  @media (max-width: 480px) {
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    margin-left: 0.4rem;
    gap: 0.2rem;
  }

  span {
    font-size: 1.1rem;
    line-height: 1;
    display: flex;
    align-items: center;
  }
`;

const Label = styled.p`
  font-weight: 500;
  margin: 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  strong {
    flex-shrink: 0;
    line-height: 1.4;
    min-width: 80px;

    @media (max-width: 480px) {
      min-width: 60px;
    }
  }

  span {
    flex-grow: 0;
    word-break: break-word;
  }

  &.shipping-option-label {
    flex-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 0.3rem 0;
    gap: 0.4rem;
  }
`;

const RouteButton = styled.button`
  margin-top: 1rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

interface ResultProps {
  origin: string;
  destination: string;
  distanceKm: number;
  weight: number;
  weightUnit: 'kg' | 'lb';
  shippingOption: string;
  totalCost: number;
  currency: string;
}

const Result: React.FC<ResultProps> = ({
  origin,
  destination,
  distanceKm,
  weight,
  weightUnit,
  shippingOption,
  totalCost,
  currency,
}) => {
  const [showMap, setShowMap] = useState(false);

  const estimatedTime = shippingOption === 'Express' ? '1–2 days' : '3–5 days';
  const shippingIconEmoji = shippingOption === 'Standard' ? '🚛' : '⚡';

  return (
    <Card
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StyledH3>📦 Estimate Summary</StyledH3>
      <Label>
        <strong>From:</strong> <span>{origin}</span>
      </Label>
      <Label>
        <strong>To:</strong> <span>{destination}</span>
      </Label>
      <Label>
        <strong>Distance:</strong> <span>{distanceKm.toFixed(2)} km</span>
      </Label>
      <Label>
        <strong>Weight:</strong> <span>{weight} {weightUnit}</span>
      </Label>
      <Label className="shipping-option-label">
        <strong>Shipping:</strong>
        <Badge type={shippingOption}>
          <span>{shippingIconEmoji}</span>
          {shippingOption}
        </Badge>
      </Label>
      <Label>
        <strong>ETA:</strong> <span>{estimatedTime}</span>
      </Label>
      <Label>
        <strong>Total Cost:</strong> <span>{totalCost.toFixed(2)} {currency}</span>
      </Label>

      <RouteButton onClick={() => setShowMap(true)}>View Route</RouteButton>

      {showMap && (
        <RouteMapCard
          origin={origin}
          destination={destination}
          onClose={() => setShowMap(false)}
        />
      )}
    </Card>
  );
};

export default Result;
