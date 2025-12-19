const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const morePlans = [
  {
    name: "Daily Pack",
    price: 19,
    validity: "1 day",
    data: "1GB",
    description: "Perfect for daily usage with unlimited calls"
  },
  {
    name: "Weekly Starter",
    price: 129,
    validity: "7 days",
    data: "1GB/day",
    description: "Weekly pack with daily data allowance"
  },
  {
    name: "Monthly Basic",
    price: 299,
    validity: "28 days",
    data: "1.5GB/day",
    description: "Monthly pack with good data and unlimited calls"
  },
  {
    name: "Monthly Standard",
    price: 449,
    validity: "28 days",
    data: "2GB/day",
    description: "Standard monthly pack with extra data"
  },
  {
    name: "Monthly Premium",
    price: 699,
    validity: "28 days",
    data: "3GB/day",
    description: "Premium pack with high-speed data and OTT benefits"
  },
  {
    name: "Quarterly Value",
    price: 999,
    validity: "84 days",
    data: "2GB/day",
    description: "Best value quarterly pack with maximum savings"
  },
  {
    name: "Half Yearly",
    price: 1799,
    validity: "180 days",
    data: "2GB/day",
    description: "Half yearly pack with great savings"
  },
  {
    name: "Annual Super",
    price: 2999,
    validity: "365 days",
    data: "2.5GB/day",
    description: "Annual pack with maximum benefits and savings"
  },
  {
    name: "Data Booster",
    price: 98,
    validity: "28 days",
    data: "6GB",
    description: "Additional data pack for existing users"
  },
  {
    name: "Talk Time",
    price: 49,
    validity: "28 days",
    data: "100MB",
    description: "Talk time recharge with basic data"
  }
];

async function addMorePlans() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');
    
    // Insert all plans
    await Plan.insertMany(morePlans);
    console.log(`Added ${morePlans.length} plans successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding plans:', error);
    process.exit(1);
  }
}

addMorePlans();