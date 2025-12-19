import { Operator } from '../types';

const MOCK_PLANS = [
  {
    id: '1',
    operator: Operator.JIO,
    price: 299,
    validity: '28 Days',
    data: '1.5 GB/Day',
    description: 'Unlimited Calls + 100 SMS/day',
    type: 'Unlimited'
  },
  {
    id: '2',
    operator: Operator.JIO,
    price: 719,
    validity: '84 Days',
    data: '2 GB/Day',
    description: 'Disney+ Hotstar Mobile for 3 Months',
    type: 'Entertainment'
  },
  {
    id: '3',
    operator: Operator.AIRTEL,
    price: 455,
    validity: '84 Days',
    data: '6 GB Total',
    description: 'Truly Unlimited Calls + Apollo 24|7 Circle',
    type: 'Unlimited'
  },
  {
    id: '4',
    operator: Operator.AIRTEL,
    price: 19,
    validity: '1 Day',
    data: '1 GB',
    description: 'Data add-on pack',
    type: 'Data'
  },
  {
    id: '5',
    operator: Operator.VI,
    price: 479,
    validity: '56 Days',
    data: '1.5 GB/Day',
    description: 'Weekend Data Rollover + Binge All Night',
    type: 'Unlimited'
  },
  {
    id: '6',
    operator: Operator.BSNL,
    price: 397,
    validity: '180 Days',
    data: '2 GB/Day',
    description: 'Unlimited Calls (First 60 days only)',
    type: 'Unlimited'
  },
  {
    id: '7',
    operator: Operator.JIO,
    price: 2999,
    validity: '365 Days',
    data: '2.5 GB/Day',
    description: 'Long term value pack with 5G Welcome Offer',
    type: 'Unlimited'
  },
  {
    id: '8',
    operator: Operator.AIRTEL,
    price: 155,
    validity: '24 Days',
    data: '1 GB Total',
    description: 'Entry level unlimited pack',
    type: 'Talktime'
  },
  {
    id: '9',
    operator: Operator.VI,
    price: 249,
    validity: '28 Days',
    data: '1.5 GB/Day',
    description: 'Balanced data + calls pack with weekend bonus',
    type: 'Unlimited'
  },
  {
    id: '10',
    operator: Operator.JIO,
    price: 129,
    validity: '14 Days',
    data: '6 GB Total',
    description: 'Short-term data pack for light users',
    type: 'Data'
  },
  {
    id: '11',
    operator: Operator.BSNL,
    price: 59,
    validity: '7 Days',
    data: '2 GB Total',
    description: 'Budget weekly data boost',
    type: 'Data'
  },
  {
    id: '12',
    operator: Operator.AIRTEL,
    price: 899,
    validity: '365 Days',
    data: '3 GB/Day',
    description: 'Annual 5G-ready plan with streaming benefits',
    type: 'Unlimited'
  }
];

export const fetchPlans = async (operator) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (operator) {
    return MOCK_PLANS.filter(p => p.operator === operator);
  }
  return MOCK_PLANS;
};

export const processPayment = async (amount) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
};
