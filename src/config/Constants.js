// src/config/Constants.js

export const LOGISTICS_PROVIDERS = {
    PROVIDER_A: 'Provider A',
    PROVIDER_B: 'Provider B',
    GENERAL_PARTNERS: 'General Partners',
  };
  
  export const CUTOFF_TIMES = {
    PROVIDER_A: 17,
    PROVIDER_B: 9, 
  };
  
  export const DEFAULT_TAT = {
    METRO: 2,
    NON_METRO: 3,
    TIER_2_3: 5,
  };
  
  export const DELIVERY_MESSAGES = {
    SAME_DAY: 'Get it today',
    NEXT_DAY: 'Get it by tomorrow',
    UNAVAILABLE: 'Delivery unavailable',
  };
  
  export const PINCODE_VALIDATION_ERROR = 'Invalid pincode. Please try again.';
  
  export const COUNTDOWN_INTERVAL = 1000; // Interval for countdown timer in milliseconds
  
  // For URLs and environment configurations
  export const API_ENDPOINTS = {
    PRODUCTS: '/api/products',
    PINCODES: '/api/pincodes',
    STOCK: '/api/stock',
  };
  