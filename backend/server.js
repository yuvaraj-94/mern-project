const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Plan = require('./models/Plan');
const Recharge = require('./models/Recharge');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const user = new User({ name, email, phone, password });
    await user.save();
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Routes
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const totalRecharges = await Recharge.countDocuments();
    const totalRevenue = await Recharge.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    res.json({
      totalUsers,
      totalPlans,
      totalRecharges,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Plan Routes
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/plans', async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/plans/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/plans/:id', async (req, res) => {
  try {
    await Plan.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Plan deactivated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Recharge Routes
app.post('/api/recharge', async (req, res) => {
  try {
    console.log('Recharge request received:', req.body);
    const { userId, planId, phoneNumber, operator } = req.body;
    
    if (!userId || !planId || !phoneNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    const recharge = new Recharge({
      userId,
      planId,
      phoneNumber,
      operator: operator || 'Jio',
      amount: plan.price,
      status: 'completed',
      transactionId: 'TXN' + Date.now() + Math.random().toString(36).substr(2, 5)
    });
    
    console.log('Saving recharge:', recharge);
    const savedRecharge = await recharge.save();
    console.log('Recharge saved successfully:', savedRecharge._id);
    
    await savedRecharge.populate(['userId', 'planId']);
    res.status(201).json(savedRecharge);
  } catch (error) {
    console.error('Recharge save error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/recharges/:userId', async (req, res) => {
  try {
    const recharges = await Recharge.find({ userId: req.params.userId })
      .populate('planId')
      .sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/recharges', async (req, res) => {
  try {
    const recharges = await Recharge.find()
      .populate(['userId', 'planId'])
      .sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed plans route
app.post('/api/seed-plans', async (req, res) => {
  try {
    await Plan.deleteMany({});
    
    const samplePlans = [
      { name: 'Basic Starter', price: 99, validity: '28 days', data: '1GB/day', description: 'Perfect for light users with daily data limit' },
      { name: 'Smart Saver', price: 149, validity: '28 days', data: '1.5GB/day', description: 'Great value plan with unlimited calls' },
      { name: 'Data Booster', price: 199, validity: '28 days', data: '2GB/day', description: 'High-speed data for streaming and browsing' },
      { name: 'Popular Choice', price: 299, validity: '28 days', data: '2GB/day', description: 'Most popular plan with extra benefits' },
      { name: 'Power Pack', price: 399, validity: '56 days', data: '2GB/day', description: 'Long validity with consistent daily data' },
      { name: 'Unlimited Pro', price: 499, validity: '56 days', data: '3GB/day', description: 'Premium plan with unlimited everything' },
      { name: 'Family Pack', price: 599, validity: '84 days', data: '2GB/day', description: 'Extended validity perfect for families' },
      { name: 'Super Saver', price: 699, validity: '84 days', data: '2.5GB/day', description: 'Maximum savings with long-term validity' },
      { name: 'Annual Basic', price: 999, validity: '365 days', data: '1GB/day', description: 'Yearly plan with consistent daily benefits' },
      { name: 'Annual Premium', price: 1499, validity: '365 days', data: '2GB/day', description: 'Premium yearly plan with maximum value' },
      { name: 'Talktime Special', price: 49, validity: '28 days', data: '100MB', description: 'Basic talktime with minimal data' },
      { name: 'Weekend Pack', price: 79, validity: '7 days', data: '1GB/day', description: 'Short-term plan for weekend usage' },
      { name: 'Student Special', price: 179, validity: '28 days', data: '1.5GB/day', description: 'Discounted plan for students' },
      { name: 'Business Pro', price: 799, validity: '28 days', data: '5GB/day', description: 'High-data plan for business users' },
      { name: 'Gaming Pack', price: 349, validity: '28 days', data: '3GB/day', description: 'Optimized for gaming with low latency' },
      { name: 'Video Streaming', price: 449, validity: '28 days', data: '4GB/day', description: 'Perfect for video streaming enthusiasts' },
      { name: 'Work From Home', price: 549, validity: '28 days', data: '4GB/day', description: 'Reliable connectivity for remote work' },
      { name: 'Travel Pack', price: 249, validity: '14 days', data: '2GB/day', description: 'Short-term plan for travelers' },
      { name: 'Senior Citizen', price: 129, validity: '28 days', data: '1GB/day', description: 'Special discounted plan for seniors' },
      { name: 'Night Owl', price: 199, validity: '28 days', data: '2GB/day', description: 'Extra data for night-time usage' }
    ];
    
    await Plan.insertMany(samplePlans);
    res.json({ message: 'Sample plans added successfully', count: samplePlans.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auto-seed plans on startup
const seedPlans = async () => {
  try {
    const existingPlans = await Plan.countDocuments();
    if (existingPlans === 0) {
      const samplePlans = [
        { name: 'Basic Starter', price: 99, validity: '28 days', data: '1GB/day', description: 'Perfect for light users with daily data limit' },
        { name: 'Smart Saver', price: 149, validity: '28 days', data: '1.5GB/day', description: 'Great value plan with unlimited calls' },
        { name: 'Data Booster', price: 199, validity: '28 days', data: '2GB/day', description: 'High-speed data for streaming and browsing' },
        { name: 'Popular Choice', price: 299, validity: '28 days', data: '2GB/day', description: 'Most popular plan with extra benefits' },
        { name: 'Power Pack', price: 399, validity: '56 days', data: '2GB/day', description: 'Long validity with consistent daily data' },
        { name: 'Unlimited Pro', price: 499, validity: '56 days', data: '3GB/day', description: 'Premium plan with unlimited everything' },
        { name: 'Family Pack', price: 599, validity: '84 days', data: '2GB/day', description: 'Extended validity perfect for families' },
        { name: 'Super Saver', price: 699, validity: '84 days', data: '2.5GB/day', description: 'Maximum savings with long-term validity' },
        { name: 'Annual Basic', price: 999, validity: '365 days', data: '1GB/day', description: 'Yearly plan with consistent daily benefits' },
        { name: 'Annual Premium', price: 1499, validity: '365 days', data: '2GB/day', description: 'Premium yearly plan with maximum value' },
        { name: 'Talktime Special', price: 49, validity: '28 days', data: '100MB', description: 'Basic talktime with minimal data' },
        { name: 'Weekend Pack', price: 79, validity: '7 days', data: '1GB/day', description: 'Short-term plan for weekend usage' },
        { name: 'Student Special', price: 179, validity: '28 days', data: '1.5GB/day', description: 'Discounted plan for students' },
        { name: 'Business Pro', price: 799, validity: '28 days', data: '5GB/day', description: 'High-data plan for business users' },
        { name: 'Gaming Pack', price: 349, validity: '28 days', data: '3GB/day', description: 'Optimized for gaming with low latency' },
        { name: 'Video Streaming', price: 449, validity: '28 days', data: '4GB/day', description: 'Perfect for video streaming enthusiasts' },
        { name: 'Work From Home', price: 549, validity: '28 days', data: '4GB/day', description: 'Reliable connectivity for remote work' },
        { name: 'Travel Pack', price: 249, validity: '14 days', data: '2GB/day', description: 'Short-term plan for travelers' },
        { name: 'Senior Citizen', price: 129, validity: '28 days', data: '1GB/day', description: 'Special discounted plan for seniors' },
        { name: 'Night Owl', price: 199, validity: '28 days', data: '2GB/day', description: 'Extra data for night-time usage' }
      ];
      
      await Plan.insertMany(samplePlans);
      console.log('✅ Sample plans added to database');
    }
  } catch (error) {
    console.error('❌ Error seeding plans:', error.message);
  }
};

// Auto-seed sample users and recharges
const seedSampleData = async () => {
  try {
    const existingUsers = await User.countDocuments();
    if (existingUsers < 10) {
      const sampleUsers = [
        { name: 'John Doe', email: 'john@example.com', phone: '9876543210', password: 'password123' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', password: 'password123' },
        { name: 'Mike Johnson', email: 'mike@example.com', phone: '9876543212', password: 'password123' },
        { name: 'Sarah Wilson', email: 'sarah@example.com', phone: '9876543213', password: 'password123' },
        { name: 'David Brown', email: 'david@example.com', phone: '9876543214', password: 'password123' },
        { name: 'Lisa Davis', email: 'lisa@example.com', phone: '9876543215', password: 'password123' },
        { name: 'Tom Miller', email: 'tom@example.com', phone: '9876543216', password: 'password123' },
        { name: 'Amy Garcia', email: 'amy@example.com', phone: '9876543217', password: 'password123' },
        { name: 'Chris Lee', email: 'chris@example.com', phone: '9876543218', password: 'password123' },
        { name: 'Emma Taylor', email: 'emma@example.com', phone: '9876543219', password: 'password123' }
      ];
      await User.insertMany(sampleUsers);
      console.log('✅ Sample users added');
    }
    
    const existingRecharges = await Recharge.countDocuments();
    if (existingRecharges === 0) {
      const users = await User.find().limit(10);
      const plans = await Plan.find().limit(20);
      
      if (users.length > 0 && plans.length > 0) {
        const operators = ['Airtel', 'Jio', 'Vi', 'BSNL'];
        const sampleRecharges = [];
        
        for (let i = 0; i < 50; i++) {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          const randomPlan = plans[Math.floor(Math.random() * plans.length)];
          const randomOperator = operators[Math.floor(Math.random() * operators.length)];
          
          sampleRecharges.push({
            userId: randomUser._id,
            planId: randomPlan._id,
            phoneNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            operator: randomOperator,
            amount: randomPlan.price,
            status: Math.random() > 0.1 ? 'completed' : 'failed',
            transactionId: 'TXN' + Date.now() + Math.random().toString(36).substr(2, 5) + i,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
          });
        }
        
        await Recharge.insertMany(sampleRecharges);
        console.log('✅ Sample recharges added');
      }
    }
  } catch (error) {
    console.error('❌ Error seeding sample data:', error.message);
  }
};

// Operator stats route
app.get('/api/admin/operator-stats', async (req, res) => {
  try {
    const stats = await Recharge.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: '$operator', count: { $sum: 1 }, revenue: { $sum: '$amount' } } },
      { $sort: { count: -1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin login route
app.post('/api/admin/login', (req, res) => {
  try {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true, message: 'Admin authenticated' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// AI Recommendation route
app.post('/api/ai-recommend', async (req, res) => {
  try {
    const { budget, usage, priority, validity, dataNeeds } = req.body;
    const plans = await Plan.find({ isActive: true });
    
    const scoredPlans = plans.map(plan => {
      let score = 0;
      let reasons = [];
      
      // Budget scoring
      if (budget === 'low' && plan.price < 200) { score += 30; reasons.push('fits your budget'); }
      else if (budget === 'medium' && plan.price >= 200 && plan.price <= 600) { score += 30; reasons.push('great value for money'); }
      else if (budget === 'high' && plan.price > 600) { score += 30; reasons.push('premium features'); }
      
      // Usage scoring
      const dataAmount = parseFloat(plan.data.replace(/[^0-9.]/g, ''));
      if (usage === 'light' && dataAmount <= 1) { score += 25; reasons.push('perfect for light usage'); }
      else if (usage === 'moderate' && dataAmount > 1 && dataAmount <= 3) { score += 25; reasons.push('ideal for regular usage'); }
      else if (usage === 'heavy' && dataAmount > 3) { score += 25; reasons.push('supports heavy usage'); }
      
      // Priority scoring
      if (priority === 'data' && dataAmount > 2) { score += 20; reasons.push('high data allowance'); }
      else if (priority === 'validity' && parseInt(plan.validity) > 56) { score += 20; reasons.push('long validity period'); }
      else if (priority === 'price' && plan.price < 300) { score += 20; reasons.push('best price point'); }
      
      // Validity scoring
      const validityDays = parseInt(plan.validity);
      if (validity === 'short' && validityDays <= 30) { score += 15; reasons.push('short-term convenience'); }
      else if (validity === 'medium' && validityDays > 30 && validityDays <= 90) { score += 15; reasons.push('balanced validity'); }
      else if (validity === 'long' && validityDays > 90) { score += 15; reasons.push('extended validity'); }
      
      // Data needs scoring
      if (dataNeeds === 'low' && dataAmount < 1) { score += 10; reasons.push('matches data needs'); }
      else if (dataNeeds === 'medium' && dataAmount >= 1 && dataAmount <= 3) { score += 10; reasons.push('perfect data amount'); }
      else if (dataNeeds === 'high' && dataAmount > 3) { score += 10; reasons.push('high-speed data'); }
      
      return {
        ...plan.toObject(),
        score,
        aiReason: reasons.slice(0, 2).join(' and ')
      };
    });
    
    const recommendations = scoredPlans
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
    
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedPlans();
  setTimeout(seedSampleData, 2000);
});