import axios from 'axios';

// Your ORS API Key from .env.local
const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

/**
 * Converts a location name (e.g. "Delhi") to coordinates [longitude, latitude]
 */
export async function geocodeAddress(address: string): Promise<[number, number]> {
  const response = await axios.get('https://api.openrouteservice.org/geocode/search', {
    params: {
      api_key: ORS_API_KEY,
      text: address,
      size: 1,
    },
  });

  if (response.data.features.length === 0) {
    throw new Error(`Could not find location: ${address}`);
  }

  return response.data.features[0].geometry.coordinates; // [lng, lat]
}

/**
 * Gets the driving distance (in kilometers) between two addresses using ORS
 */
export async function getDistanceKm(origin: string, destination: string): Promise<number> {
  const originCoords = await geocodeAddress(origin);
  const destCoords = await geocodeAddress(destination);

  const response = await axios.post(
    'https://api.openrouteservice.org/v2/matrix/driving-car',
    {
      locations: [originCoords, destCoords],
      metrics: ['distance'],
    },
    {
      headers: {
        Authorization: ORS_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );

  const distanceMeters = response.data.distances[0][1]; // from → to
  return distanceMeters / 1000; // convert to kilometers
}

/**
 * Converts a cost from USD to selected currency using exchangerate.host
 */
export async function convertCurrency(amount: number, toCurrency: string): Promise<number> {
  if (toCurrency === 'USD') return amount;

  const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/${toCurrency}/${amount}`;

  try {
    const response = await axios.get(url);

    if (response.data.result !== 'success') {
      throw new Error('Currency conversion failed');
    }

    return response.data.conversion_result;
  } catch (error) {
    console.error('Currency conversion error:', error);
    throw new Error('Currency conversion failed');
  }
}
