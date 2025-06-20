/*
    This file contains functions to interact with external APIs
  - Geocoding addresses to coordinates using OpenRouteService
  - Calculating distances between two locations
  - Converting currency using exchangerate.host
*/


import axios from 'axios';
const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

 // Ensure the ORS_API_KEY is set
 //Converts a location name (e.g. "Delhi") to coordinates [longitude, latitude]

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


//This function calculates the distance in kilometers between two locations using OpenRouteService's matrix API
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


//This function converts an amount from USD to another currency using the ExchangeRate-API
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




