// src/components/ProEstimateForm.tsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaWeight, FaShippingFast, FaDollarSign, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { getDistanceKm, convertCurrency } from '../services/api';
import { calculateCost } from '../utils/calculations';
import { STANDARD_MULTIPLIER, EXPRESS_MULTIPLIER, DEFAULT_CURRENCY } from '../utils/constants';
import { useAppContext } from '../context/AppContext';
import Result from './Results';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px);}
  to { opacity: 1; transform: translateY(0);}
`;

const GlassCard = styled(motion.div)`
  background: rgba(255,255,255,0.18);
  box-shadow: 0 8px 40px rgba(31,38,135,0.18), 0 1.5px 8px #1e293b33;
  backdrop-filter: blur(28px);
  border-radius: 1.7rem;
  border: 1.5px solid #e0e7ff44;
  padding: 2.5rem 2.5rem 2.2rem 2.5rem;
  max-width: 440px;
  margin: 0 auto;
  color: #22223b;
  animation: ${fadeIn} 0.8s;
  position: relative;
`;

const AppLogo = styled.div`
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 1.8rem;
  color: #2563eb;
`;

const StepperBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 2rem;
`;

const Step = styled.div<{active: boolean}>`
  height: 10px;
  width: 32px;
  border-radius: 8px;
  background: ${({active}) => active ? "linear-gradient(90deg,#2563eb,#60a5fa)" : "#cbd5e1"};
  transition: background 0.3s;
`;

const FloatingLabel = styled.label<{active: boolean}>`
  position: absolute;
  left: 20px;
  top: ${({active}) => active ? "11px" : "24px"};
  font-size: ${({active}) => active ? "0.87rem" : "1.08rem"};
  color: ${({active}) => active ? "#2563eb" : "#64748b"};
  background: transparent;
  padding: 0 5px;
  pointer-events: none;
  transition: 0.2s all;
  z-index: 2;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.8rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1rem 0.7rem 1rem;
  border-radius: 14px;
  border: 1.5px solid #cbd5e1;
  background: #f8fafc88;
  font-size: 1.11rem;
  color: #111;
  transition: border-color 0.2s;
  &:focus {
    border-color: #2563eb;
    outline: none;
    background: #f1f5f988;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1.1rem 1rem 0.7rem 1rem;
  border-radius: 14px;
  border: 1.5px solid #cbd5e1;
  background: #f8fafc88;
  font-size: 1.11rem;
  color: #111;
  margin-bottom: 0.5rem;
  &:focus {
    border-color: #2563eb;
    outline: none;
    background: #f1f5f988;
  }
`;

const NextButton = styled.button`
  background: linear-gradient(90deg,#2563eb,#60a5fa);
  color: #fff;
  border: none;
  border-radius: 9px;
  padding: 1rem 1.7rem;
  font-size: 1.13rem;
  font-weight: 600;
  margin-top: 0.3rem;
  cursor: pointer;
  box-shadow: 0 4px 16px 0 #2563eb33;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  transition: background 0.21s;
  &:hover { background: linear-gradient(90deg,#60a5fa,#2563eb);}
  &:disabled { background: #cbd5e1; color: #94a3b8;}
`;

const ErrorText = styled.div`
  color: #dc2626;
  font-size: 1.03rem;
  margin-bottom: 1.1rem;
  min-height: 1.1rem;
`;

const SuccessIcon = styled(FaCheckCircle)`
  color: #22c55e;
  font-size: 2.2rem;
  display: block;
  margin: 0 auto 0.7rem auto;
`;

const LoadingSpinner = styled.div`
  margin: 1.5rem auto 0 auto;
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

const steps = [
  { label: "Origin", icon: <FaMapMarkerAlt />, placeholder: "Origin address/city" },
  { label: "Destination", icon: <FaMapMarkerAlt />, placeholder: "Destination address/city" },
  { label: "Weight", icon: <FaWeight />, placeholder: "Weight (kg)" },
  { label: "Option", icon: <FaShippingFast />, options: ["Standard", "Express"] },
  { label: "Currency", icon: <FaDollarSign />, options: ["USD", "EUR", "JPY"] }
];

export default function ProEstimateForm({ onEstimate }) {
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState(["", "", "", "Standard", "USD"]);
  const [touched, setTouched] = useState([false, false, false, false, false]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const { addEstimate } = useAppContext();

  const handleInput = (e) => {
    const updated = [...fields];
    updated[step] = e.target.value;
    setFields(updated);
    setTouched((old) => {
      const arr = [...old];
      arr[step] = true;
      return arr;
    });
    setError("");
  };

  const validateStep = () => {
    if (step < 2 && !fields[step].trim()) return "This field is required.";
    if (step === 2 && (isNaN(Number(fields[2])) || Number(fields[2]) <= 0)) return "Enter a valid weight.";
    return "";
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError("");
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const handlePrev = () => { setStep((s) => Math.max(0, s - 1)); setError(""); };

  const handleSubmit = async () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError("");
    setSuccess(true);
    setLoading(true);

    const [origin, destination, weight, shippingOption, currency] = fields;
    try {
      const distanceKm = await getDistanceKm(origin, destination);
      const multiplier = shippingOption === 'Express' ? EXPRESS_MULTIPLIER : STANDARD_MULTIPLIER;
      let totalCost = calculateCost(distanceKm, Number(weight), multiplier);
      if (currency !== DEFAULT_CURRENCY) {
        totalCost = await convertCurrency(totalCost, currency);
      }
      const estimate = {
        origin,
        destination,
        weight: Number(weight),
        shippingOption,
        distanceKm,
        totalCost,
        currency,
      };
      addEstimate(estimate);
      if (onEstimate) onEstimate(estimate);
      setTimeout(() => {
        setSuccess(false);
        setLoading(false);
        setResult(estimate);
      }, 1300);
    } catch (err: any) {
      setError(err.message || "Error calculating estimate.");
      setSuccess(false);
      setLoading(false);
    }
  };

  const handleEstimateAgain = () => {
    setResult(null);
    setStep(0);
    setFields(["", "", "", "Standard", "USD"]);
    setError("");
    setTouched([false, false, false, false, false]);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 60%, #6366f1 100%)",
      padding: "0",
      fontFamily: "Poppins, sans-serif"
    }}>
      <GlassCard
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <AppLogo>
          <FaShippingFast /> <span style={{ fontWeight: 700, fontSize: "1.1rem", marginLeft: "7px" }}>ShipMate</span>
        </AppLogo>
        <StepperBar>
          {steps.map((_, idx) => (
            <Step key={idx} active={idx <= step} />
          ))}
        </StepperBar>
        {result ? (
          <>
            <Result
              origin={result.origin}
              destination={result.destination}
              distanceKm={result.distanceKm}
              weight={result.weight}
              shippingOption={result.shippingOption}
              totalCost={result.totalCost}
              currency={result.currency}
            />
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <NextButton type="button" onClick={handleEstimateAgain}>
                Estimate Again
              </NextButton>
            </div>
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.44 }}
            >
              <div style={{ marginBottom: "1rem", fontWeight: 600, fontSize: "1.18rem", display: "flex", alignItems: "center", gap: 7 }}>
                {steps[step].icon} {steps[step].label}
              </div>
              <InputGroup>
                {steps[step].options ? (
                  <Select value={fields[step]} onChange={handleInput} aria-label={steps[step].label}>
                    {steps[step].options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </Select>
                ) : (
                  <>
                    <Input
                      type={step === 2 ? "number" : "text"}
                      value={fields[step]}
                      onChange={handleInput}
                      onBlur={() => setTouched((old) => { const arr = [...old]; arr[step] = true; return arr; })}
                      aria-label={steps[step].label}
                    />
                    <FloatingLabel active={fields[step] !== "" || document.activeElement === document.activeElement}>
                      {steps[step].placeholder}
                    </FloatingLabel>
                  </>
                )}
              </InputGroup>
              <ErrorText>{error}</ErrorText>
              <div style={{ display: "flex", gap: "0.9rem" }}>
                {step > 0 && (
                  <NextButton type="button" onClick={handlePrev}>
                    Back
                  </NextButton>
                )}
                {step === steps.length - 1 ? (
                  <NextButton type="button" onClick={handleSubmit} disabled={loading}>
                    Estimate <FaArrowRight />
                  </NextButton>
                ) : (
                  <NextButton type="button" onClick={handleNext} disabled={!fields[step]}>
                    Next <FaArrowRight />
                  </NextButton>
                )}
              </div>
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.55 }}
                  style={{ textAlign: "center", marginTop: "2rem" }}
                >
                  <SuccessIcon />
                  <div style={{ color: "#22c55e", fontWeight: 600, marginTop: 5 }}>Estimate calculated!</div>
                </motion.div>
              )}
              {loading && <LoadingSpinner />}
            </motion.div>
          </AnimatePresence>
        )}
      </GlassCard>
    </div>
  );
}