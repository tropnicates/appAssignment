// src/utils/validatePincode.js
import { loadPincodes } from '../data/Pincodes';

const pincodes = loadPincodes();

export const validatePincode = (pincode) => {
  if (pincodes[pincode]) {
    return pincodes[pincode];
  }
  return null;
};
