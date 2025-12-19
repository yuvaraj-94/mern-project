const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const samplePlans = [
  {
    name: "Basic Plan",
    price: 199,
    validity: "28 days",
    data: "1GB/day",
    description: "Perfect for light users with basic data needs"
  },
  {
    name: "Popular Plan",
    price: 399,
    validity: "56 days",
    data: "2GB/day",
    description: "Most popular plan with unlimited calls and SMS"
  },
  {
    name: "Premium Plan",
    price: 599,
    validity: "84 days",
    data: "3GB/day",
    description: "High-speed data with premium benefits"
  },
  {
    name: "Unlimited Plan",
    price: 999,
    validity: "365 days",
    data: "2GB/day",
    description: "Annual plan with maximum savings"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing plans
    await Plan.deleteMany({});
    
    // Insert sample plans
    await Plan.insertMany(samplePlans);
    console.log('Sample plans added successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();