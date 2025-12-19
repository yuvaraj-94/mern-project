const mongoose = require('mongoose');
require('dotenv').config();

const Plan = require('./models/Plan');

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing plans
    await Plan.deleteMany({});
    console.log('🗑️ Cleared existing plans');

    // Seed plans
    const plans = [
      { name: 'Basic Starter', price: 99, validity: '28 days', data: '1GB/day', description: 'Perfect for light users', isActive: true },
      { name: 'Smart Saver', price: 149, validity: '28 days', data: '1.5GB/day', description: 'Great value plan', isActive: true },
      { name: 'Data Booster', price: 199, validity: '28 days', data: '2GB/day', description: 'High-speed data', isActive: true },
      { name: 'Popular Choice', price: 299, validity: '28 days', data: '2GB/day', description: 'Most popular plan', isActive: true },
      { name: 'Power Pack', price: 399, validity: '56 days', data: '2GB/day', description: 'Long validity', isActive: true },
      { name: 'Unlimited Pro', price: 499, validity: '56 days', data: '3GB/day', description: 'Premium plan', isActive: true },
      { name: 'Family Pack', price: 599, validity: '84 days', data: '2GB/day', description: 'Extended validity', isActive: true },
      { name: 'Super Saver', price: 699, validity: '84 days', data: '2.5GB/day', description: 'Maximum savings', isActive: true },
      { name: 'Annual Basic', price: 999, validity: '365 days', data: '1GB/day', description: 'Yearly plan', isActive: true },
      { name: 'Annual Premium', price: 1499, validity: '365 days', data: '2GB/day', description: 'Premium yearly plan', isActive: true }
    ];

    const savedPlans = await Plan.insertMany(plans);
    console.log(`✅ Seeded ${savedPlans.length} plans to MongoDB`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedPlans();