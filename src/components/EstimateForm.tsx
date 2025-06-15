import React, { useState } from 'react';
import styled from 'styled-components';
import { getDistanceKm, convertCurrency } from '../services/api';
import { calculateCost } from '../utils/calculations';
import { STANDARD_MULTIPLIER, EXPRESS_MULTIPLIER, DEFAULT_CURRENCY } from '../utils/constants';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import Result from './Results';


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  font-family: 'Poppins', sans-serif;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  color: #f1f5f9;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 1.5rem;
  font-weight: 600;
  color: #cbd5e1;
`;

const Input = styled.input`
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #475569;
  border-radius: 0.75rem;
  font-size: 1rem;
  background: #1e293b;
  color: #f1f5f9;
  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.4);
  }
`;

const Select = styled.select`
  ${Input}
`;

const Button = styled.button`
  margin-top: 2.5rem;
  padding: 0.9rem;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
  &:hover {
    transform: scale(1.02);
    background: linear-gradient(to right, #4f46e5, #7c3aed);
  }
  &:disabled {
    background: #475569;
    cursor: not-allowed;
  }
`;

const SummaryCard = styled(motion.div)`
  margin-top: 2.5rem;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.9);
  border-radius: 1rem;
  border: 1px solid #334155;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  color: #f8fafc;
`;

const ErrorText = styled.div`
  color: #f87171;
  margin-top: 1.2rem;
  font-size: 0.95rem;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  margin: 0 auto;
  margin-top: 1rem;
  border: 4px solid #e0e7ff;
  border-top: 4px solid #6366f1;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EstimateForm: React.FC = () => {
  const { addEstimate } = useAppContext();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState<number | ''>('');
  const [option, setOption] = useState('Standard');
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSummary(null);
    if (!origin || !destination || !weight || weight <= 0) {
      setError('Please enter valid origin, destination, and weight.');
      return;
    }
    setLoading(true);
    try {
      const distanceKm = await getDistanceKm(origin, destination);
      const multiplier = option === 'Express' ? EXPRESS_MULTIPLIER : STANDARD_MULTIPLIER;
      let totalCost = calculateCost(distanceKm, Number(weight), multiplier);
      if (currency !== DEFAULT_CURRENCY) {
        totalCost = await convertCurrency(totalCost, currency);
      }
      const estimate = {
        origin,
        destination,
        weight: Number(weight),
        shippingOption: option,
        distanceKm,
        totalCost,
        currency,
      };
      addEstimate(estimate);
      setSummary(estimate);
    } catch (err: any) {
      setError(err.message || 'Error calculating estimate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Card initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Heading>🚚 Shipping Rate Estimator</Heading>
        <Form onSubmit={handleSubmit}>
          <Label>Origin</Label>
          <Input value={origin} onChange={e => setOrigin(e.target.value)} placeholder="e.g. Delhi" />

          <Label>Destination</Label>
          <Input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Mumbai" />

          <Label>Weight (kg)</Label>
          <Input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
            min="0"
            step="any"
            placeholder="Enter weight"
          />

          <Label>Shipping Option</Label>
          <Select value={option} onChange={e => setOption(e.target.value)}>
            <option>Standard</option>
            <option>Express</option>
          </Select>

          <Label>Currency</Label>
          <Select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
          </Select>

          {error && <ErrorText>{error}</ErrorText>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Calculating...' : 'Estimate Shipping Cost'}
          </Button>

          {loading && <LoadingSpinner />}
        </Form>

        {summary && (
  <Result
    origin={summary.origin}
    destination={summary.destination}
    distanceKm={summary.distanceKm}
    weight={summary.weight}
    shippingOption={summary.shippingOption}
    totalCost={summary.totalCost}
    currency={summary.currency}
  />
)}

      </Card>
    </PageContainer>
  );
};

export default EstimateForm;
