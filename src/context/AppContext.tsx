import React, { createContext, useContext, useState, useEffect } from 'react';

interface Estimate {
  origin: string;
  destination: string;
  weight: number;
  shippingOption: string;
  distanceKm: number;
  totalCost: number;
  currency: string;
}

interface AppContextType {
  previousEstimates: Estimate[];
  addEstimate: (est: Estimate) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [previousEstimates, setPreviousEstimates] = useState<Estimate[]>([]);

  // Load stored estimates on mount
  useEffect(() => {
    const saved = localStorage.getItem('estimates');
    if (saved) {
      setPreviousEstimates(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever estimates update
  useEffect(() => {
    localStorage.setItem('estimates', JSON.stringify(previousEstimates));
  }, [previousEstimates]);

  const addEstimate = (est: Estimate) => {
    setPreviousEstimates(prev => [est, ...prev]);
  };

  return (
    <AppContext.Provider value={{ previousEstimates, addEstimate }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
