// src/components/Result.tsx
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
  width: 100%; /* Ensure card takes full width of its parent */
  max-width: 440px; /* Max width for desktop, similar to ProEstimateForm */

  /* Responsive adjustments for Card */
  @media (max-width: 768px) {
    padding: 1.2rem;
    margin-top: 1.5rem;
    max-width: 90%; /* Adjust max-width for tablets */
  }
  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 0.8rem;
    max-width: 95%; /* Adjust max-width for mobile */
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
  display: inline-flex; /* Use inline-flex to display content in a row */
  align-items: center; /* Vertically center icon and text */
  justify-content: center; /* Horizontally center content */
  padding: 0.25rem 0.75rem; /* Re-add padding to accommodate text */
  font-size: 0.85rem; /* Font size for the text inside badge */
  border-radius: 999px; /* Pill shape */
  font-weight: 600;
  margin-left: 0.5rem;
  flex-shrink: 0; /* Prevent the badge from shrinking */
  gap: 0.3rem; /* Space between icon and text inside badge */

  background: ${({ type }) => (type === 'Express' ? '#fee2e2' : '#dbeafe')}; /* Original badge background colors */
  color: ${({ type }) => (type === 'Express' ? '#b91c1c' : '#1e3a8a')}; /* Original badge text colors */

  /* Responsive adjustments for Badge */
  @media (max-width: 480px) {
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    margin-left: 0.4rem;
    gap: 0.2rem;
  }

  /* Style for the emoji/icon within the badge */
  span { /* This targets the span that contains the emoji */
    font-size: 1.1rem; /* Adjust emoji size relative to badge text */
    line-height: 1; /* Ensure emoji aligns well */
    display: flex; /* To ensure proper alignment */
    align-items: center;
  }
`;

const Label = styled.p`
  font-weight: 500;
  margin: 0.4rem 0;
  display: flex; /* Use flexbox for layout of label and value */
  align-items: center; /* Vertically align content within the label */
  gap: 0.5rem; /* Space between strong (label) and span (value) */
  font-size: 1rem; /* Base font size for labels */

  strong {
    flex-shrink: 0; /* Prevent label text from shrinking */
    line-height: 1.4; /* Ensure consistent line height */
    min-width: 80px; /* Give labels consistent min-width for alignment */
    
    @media (max-width: 480px) {
        min-width: 60px; /* Smaller min-width on mobile */
    }
  }

  span {
    flex-grow: 0; /* Allow value to take remaining space */
    word-break: break-word; /* Break long words */
  }
  
  /* Specific style for the Shipping Option label to prevent wrapping its contents */
  &.shipping-option-label {
    flex-wrap: nowrap; /* CRITICAL: Prevent wrapping for the 'Shipping Option' line */
    overflow: hidden; /* Hide any overflow if content is too long for nowrap */
    text-overflow: ellipsis; /* Add ellipsis if hidden */
  }

  @media (max-width: 480px) {
    font-size: 0.9rem; /* Smaller font for labels on mobile */
    margin: 0.3rem 0;
    gap: 0.4rem;
  }
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
  // Determine the correct emoji based on shippingOption
  const shippingIconEmoji = shippingOption === 'Standard' ? '🚛' : '⚡'; // Using ⚡ for Express

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
        <strong>Weight:</strong> <span>{weight} kg</span>
      </Label>
      <Label className="shipping-option-label"> {/* Add class for specific styling */}
        <strong>Shipping Option:</strong>
        <Badge type={shippingOption}>
          <span>{shippingIconEmoji}</span> {/* Icon in its own span for precise styling */}
          {shippingOption} {/* NOW THE TEXT IS HERE, NEXT TO THE ICON */}
        </Badge>
      </Label>
      <Label>
        <strong>ETA:</strong> <span>{estimatedTime}</span>
      </Label>
      <Label>
        <strong>Total Cost:</strong> <span>{totalCost.toFixed(2)} {currency}</span>
      </Label>
    </Card>
  );
};

export default Result;