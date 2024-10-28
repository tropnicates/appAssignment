import { addDays, format } from 'date-fns';

export const calculateDeliveryDate = (provider, pincode, tat) => {
  const now = new Date();

  if (provider === 'Provider A') {
    const cutoffTime = 17; 
    if (now.getHours() < cutoffTime) {
      return format(now, 'yyyy-MM-dd'); 
    } else {
      return format(addDays(now, 1), 'yyyy-MM-dd'); 
    }
  } else if (provider === 'Provider B') {
    const cutoffTime = 9;
    if (now.getHours() < cutoffTime) {
      return format(now, 'yyyy-MM-dd'); 
    } else {
      return format(addDays(now, 1), 'yyyy-MM-dd'); 
    }
  } else if (provider === 'General Partners') {
    return format(addDays(now, tat), 'yyyy-MM-dd'); 
  }

  return 'Unavailable';
};
