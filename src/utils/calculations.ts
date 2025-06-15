/**
 * Calculate shipping cost given distance (km), weight (kg), and option multiplier.
 */
export function calculateCost(distanceKm: number, weight: number, multiplier: number): number {
  // cost = base rate * distance * weight * multiplier
  const baseRate = 0.05; // using constant from constants (could also import)
  return distanceKm * weight * baseRate * multiplier;
}
