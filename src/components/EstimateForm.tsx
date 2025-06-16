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
  padding: 2.5rem 2.5rem 2.2rem 2.5rem; /* Default padding */
  max-width: 440px; /* Default max-width for desktop */
  margin: 0 auto; 
  color: #22223b;
  animation: ${fadeIn} 0.8s;
  position: relative;

  @media (max-width: 768px) {
    max-width: 90%; /* Adjust max-width for tablets */
    padding: 2rem 2rem 1.8rem 2rem;
  }

  @media (max-width: 480px) {
    max-width: 95%; /* Adjust max-width for mobile */
    border-radius: 1.2rem;
    padding: 1.5rem 1.5rem 1.2rem 1.5rem;
  }
`;

const AppLogo = styled.div`
  text-align: center;
  font-size: 2.4rem; /* Default font size */
  margin-bottom: 1.8rem;
  color: #2563eb;

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const StepperBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    gap: 4px; /* Smaller gap on mobile */
    margin-bottom: 1.5rem;
  }
`;

const Step = styled.div<{active: boolean}>`
  height: 10px;
  width: 32px; /* Default width */
  border-radius: 8px;
  background: ${({active}) => active ? "linear-gradient(90deg,#2563eb,#60a5fa)" : "#cbd5e1"};
  transition: background 0.3s;

  @media (max-width: 480px) {
    width: 24px; /* Smaller width on mobile */
    height: 8px;
  }
`;

const FloatingLabel = styled.label<{active: boolean}>`
  position: absolute;
  left: 20px;
  top: ${({active}) => active ? "11px" : "24px"}; /* Adjust top for default/active state */
  font-size: ${({active}) => active ? "0.87rem" : "1.08rem"};
  color: ${({active}) => active ? "#2563eb" : "#64748b"};
  background: transparent;
  padding: 0 5px;
  pointer-events: none;
  transition: 0.2s all;
  z-index: 2;

  @media (max-width: 480px) {
    left: 15px; /* Adjust for smaller padding of input */
    top: ${({active}) => active ? "9px" : "21px"}; /* Adjust for smaller input height */
    font-size: ${({active}) => active ? "0.8rem" : "1rem"};
  }
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.8rem;
  z-index: 1; 
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1rem 0.7rem 1rem; /* Default padding */
  padding-top: 1.5rem; /* Ensures text doesn't overlap floating label */
  border-radius: 14px;
  border: 1.5px solid #cbd5e1;
  background: #f8fafc88;
  font-size: 1.11rem; /* Default font size */
  color: #111;
  transition: border-color 0.2s;
  &:focus {
    border-color: #2563eb;
    outline: none;
    background: #f1f5f988;
  }

  @media (max-width: 480px) {
    padding: 0.9rem 0.8rem 0.5rem 0.8rem; /* Smaller padding on mobile */
    padding-top: 1.3rem; /* Adjusted for mobile floating label */
    font-size: 1rem;
    border-radius: 12px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1.1rem 1rem 0.7rem 1rem; /* Default padding */
  border-radius: 14px;
  border: 1.5px solid #cbd5e1;
  background: #f8fafc88;
  font-size: 1.11rem; /* Default font size */
  color: #111;
  margin-bottom: 0.5rem;
  &:focus {
    border-color: #2563eb;
    outline: none;
    background: #f1f5f988;
  }

  @media (max-width: 480px) {
    padding: 0.9rem 0.8rem 0.5rem 0.8rem; /* Smaller padding on mobile */
    font-size: 1rem;
    border-radius: 12px;
  }
`;

const NextButton = styled.button`
  background: linear-gradient(90deg,#2563eb,#60a5fa);
  color: #fff;
  border: none;
  border-radius: 9px;
  padding: 1rem 1.7rem; /* Default padding */
  font-size: 1.13rem; /* Default font size */
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

  @media (max-width: 480px) {
    padding: 0.8rem 1.2rem; /* Smaller padding on mobile */
    font-size: 1.05rem;
    gap: 0.5rem;
    border-radius: 7px;
  }
`;

const ErrorText = styled.div`
  color: #dc2626;
  font-size: 1.03rem; /* Default font size */
  margin-bottom: 1.1rem;
  min-height: 1.1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
    min-height: 0.9rem;
  }
`;

const SuccessIcon = styled(FaCheckCircle)`
  color: #22c55e;
  font-size: 2.2rem;
  display: block;
  margin: 0 auto 0.7rem auto;

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
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

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
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
  const [isFocused, setIsFocused] = useState(false);

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
      padding: "2rem 1rem", 
      fontFamily: "Poppins, sans-serif",
      display: "flex",       
      justifyContent: "center", 
      alignItems: "flex-start", 
      flexGrow: 1,           
      width: "100%",         
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
                      onFocus={() => setIsFocused(true)}
                      onBlur={(e) => {
                          setIsFocused(false);
                          setTouched((old) => { const arr = [...old]; arr[step] = true; return arr; });
                      }}
                      aria-label={steps[step].label}
                    />
                    <FloatingLabel active={fields[step] !== "" || isFocused}>
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