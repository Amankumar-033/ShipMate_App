# Shipping Rate Estimator

A Vite + React + TypeScript app to estimate shipping costs based on distance, weight, and shipping options.

## Features
- Input origin, destination (addresses), and weight.
- Real-time validation of inputs.
- Uses Google Maps API to fetch distance.
- Configurable cost formula: baseRate × distance × weight × (option multiplier).
- Displays breakdown: distance, weight, per-unit rate, total cost.
- Choose shipping speed (Standard, Express).
- View route on an embedded Google Map.
- Select currency; fetches current exchange rates to convert total.
- Saves previous estimates in localStorage.
- Responsive design and accessibility (keyboard navigation, ARIA labels).

## Setup
1. Clone the repo.  
2. Copy `.env.sample` to `.env.local` and fill in your API keys.  
3. Run `npm install` and then `npm run dev` to start the dev server.  

## Folder Structure
- **`src/components/`**: React components (form, results, map, history).  
- **`src/context/`**: React Context provider for app state.  
- **`src/services/`**: API call functions (Google Maps, currency).  
- **`src/utils/`**: Calculation helpers and constants.  
- **`src/styles/`**: Global styles and theming.  

## Notes
- The Google Maps and currency APIs require keys. Use environment variables (`import.meta.env.VITE_...`).  
- For currency, this demo uses [exchangerate.host](https://exchangerate.host) (no key needed), but you can replace with your preferred service.  
