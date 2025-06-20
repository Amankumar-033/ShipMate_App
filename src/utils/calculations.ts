export function calculateCost(distanceKm: number,weight: number,multiplier: number, weightUnit: 'kg' | 'lb'): number {
  const baseRatePerKg = 0.05;
  const conversionFactor = 2.20462; // 1 kg = 2.20462 lb
  const baseRate = weightUnit === 'kg' ? baseRatePerKg : baseRatePerKg / conversionFactor;

  return distanceKm * weight * baseRate * multiplier;
}

//This will calculate the cost of shipping based on distance, weight, and a multiplier.