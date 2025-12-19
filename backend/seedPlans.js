const axios = require('axios');

const seedPlans = async () => {
  try {
    const response = await axios.post('http://localhost:3001/api/seed-plans');
    console.log('✅ Plans seeded successfully:', response.data);
  } catch (error) {
    console.error('❌ Error seeding plans:', error.response?.data || error.message);
  }
};

seedPlans();