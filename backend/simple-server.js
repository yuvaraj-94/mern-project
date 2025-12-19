const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Plan = require('./models/Plan');
const Recharge = require('./models/Recharge');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection to 'mongo' database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    console.log('📊 Using database: mongo');
    console.log('🔗 Connection ready for collections: users, plans, recharges');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Check your MongoDB Atlas connection string');
  });

// In-memory data storage
let users = [
  {
    _id: 'demo1',
    name: 'Demo User',
    email: 'demo@mobicharge.com',
    phone: '9876543210',
    password: 'demo123',
    role: 'user',
    createdAt: new Date()
  },
  {
    _id: 'admin1',
    name: 'Admin User',
    email: 'admin@mobicharge.com',
    phone: '9876543211',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date()
  }
];
let plans = [
  { _id: '1', name: 'Basic Starter', price: 99, validity: '28 days', data: '1GB/day', description: 'Perfect for light users', isActive: true },
  { _id: '2', name: 'Smart Saver', price: 149, validity: '28 days', data: '1.5GB/day', description: 'Great value plan', isActive: true },
  { _id: '3', name: 'Data Booster', price: 199, validity: '28 days', data: '2GB/day', description: 'High-speed data', isActive: true },
  { _id: '4', name: 'Popular Choice', price: 299, validity: '28 days', data: '2GB/day', description: 'Most popular plan', isActive: true },
  { _id: '5', name: 'Power Pack', price: 399, validity: '56 days', data: '2GB/day', description: 'Long validity', isActive: true },
  { _id: '6', name: 'Unlimited Pro', price: 499, validity: '56 days', data: '3GB/day', description: 'Premium plan', isActive: true },
  { _id: '7', name: 'Family Pack', price: 599, validity: '84 days', data: '2GB/day', description: 'Extended validity', isActive: true },
  { _id: '8', name: 'Super Saver', price: 699, validity: '84 days', data: '2.5GB/day', description: 'Maximum savings', isActive: true },
  { _id: '9', name: 'Annual Basic', price: 999, validity: '365 days', data: '1GB/day', description: 'Yearly plan', isActive: true },
  { _id: '10', name: 'Annual Premium', price: 1499, validity: '365 days', data: '2GB/day', description: 'Premium yearly plan', isActive: true },
  { _id: '11', name: 'Talktime Special', price: 49, validity: '28 days', data: '100MB', description: 'Basic talktime', isActive: true },
  { _id: '12', name: 'Weekend Pack', price: 79, validity: '7 days', data: '1GB/day', description: 'Short-term plan', isActive: true },
  { _id: '13', name: 'Student Special', price: 179, validity: '28 days', data: '1.5GB/day', description: 'Discounted for students', isActive: true },
  { _id: '14', name: 'Business Pro', price: 799, validity: '28 days', data: '5GB/day', description: 'High-data plan', isActive: true },
  { _id: '15', name: 'Gaming Pack', price: 349, validity: '28 days', data: '3GB/day', description: 'Optimized for gaming', isActive: true },
  { _id: '16', name: 'Video Streaming', price: 449, validity: '28 days', data: '4GB/day', description: 'Perfect for streaming', isActive: true },
  { _id: '17', name: 'Work From Home', price: 549, validity: '28 days', data: '4GB/day', description: 'Reliable connectivity', isActive: true },
  { _id: '18', name: 'Travel Pack', price: 249, validity: '14 days', data: '2GB/day', description: 'Short-term for travelers', isActive: true },
  { _id: '19', name: 'Senior Citizen', price: 129, validity: '28 days', data: '1GB/day', description: 'Special discounted plan', isActive: true },
  { _id: '20', name: 'Night Owl', price: 199, validity: '28 days', data: '2GB/day', description: 'Extra data for night usage', isActive: true }
];
let recharges = [];
let userIdCounter = 100;
let rechargeIdCounter = 1;

// Basic route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

// Debug route - list all users
app.get('/debug/users', (req, res) => {
  res.json({
    inMemoryUsers: users.map(u => ({ email: u.email, name: u.name, role: u.role })),
    totalInMemory: users.length
  });
});

app.get('/api/debug/users', async (req, res) => {
  try {
    const dbUsers = await User.find({}, 'email name phone createdAt');
    res.json({
      databaseUsers: dbUsers,
      inMemoryUsers: users.map(u => ({ email: u.email, name: u.name, role: u.role })),
      totalDB: dbUsers.length,
      totalInMemory: users.length
    });
  } catch (error) {
    res.json({
      error: error.message,
      inMemoryUsers: users.map(u => ({ email: u.email, name: u.name, role: u.role })),
      totalInMemory: users.length
    });
  }
});

// Register route
app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    console.log('Registration attempt:', { name, email, phone });
    
    // Check if user already exists in DB
    let existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user in DB
    const newUser = new User({ 
      name, 
      email: email.toLowerCase().trim(), 
      phone, 
      password,
      role: 'user'
    });
    const savedUser = await newUser.save();
    
    console.log('✅ User registered successfully in MongoDB:', email);
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    console.log('Registration attempt:', { name, email, phone });
    
    // Check if user already exists
    let existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const newUser = new User({ 
      name, 
      email: email.toLowerCase().trim(), 
      phone, 
      password 
    });
    const savedUser = await newUser.save();
    
    console.log('User registered successfully:', email);
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email });
    
    // First check MongoDB
    let user = await User.findOne({ email: email.toLowerCase().trim() });
    
    // If not in MongoDB, check in-memory demo users
    if (!user) {
      console.log('User not in MongoDB, checking demo users');
      user = users.find(u => u.email === email.toLowerCase().trim());
    }
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (user.password !== password) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log('✅ Login successful for:', email);
    const { password: _, ...userWithoutPassword } = user.toObject ? user.toObject() : user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email });
    
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (user.password !== password) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log('Login successful for:', email);
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Plans route
app.get('/plans', async (req, res) => {
  try {
    // Get plans from MongoDB first
    let dbPlans = await Plan.find({ isActive: true });
    
    // If no plans in MongoDB, return in-memory plans
    if (dbPlans.length === 0) {
      console.log('⚠️ No plans in MongoDB, using fallback plans');
      res.json(plans);
    } else {
      console.log(`✅ Found ${dbPlans.length} plans in MongoDB`);
      res.json(dbPlans);
    }
  } catch (error) {
    console.error('❌ Plans fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/plans', async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === 'admin123') {
    res.json({ success: true, message: 'Admin authenticated' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Admin stats
app.get('/admin/stats', async (req, res) => {
  try {
    const [dbUsers, dbPlans, dbRecharges] = await Promise.all([
      User.countDocuments(),
      Plan.countDocuments({ isActive: true }),
      Recharge.find()
    ]);
    
    const totalUsers = dbUsers + users.length; // Include demo users
    const totalPlans = dbPlans > 0 ? dbPlans : plans.length;
    const totalRecharges = dbRecharges.length;
    const totalRevenue = dbRecharges.reduce((sum, r) => sum + r.amount, 0);
    
    console.log(`📊 Admin stats: Users=${totalUsers}, Plans=${totalPlans}, Recharges=${totalRecharges}, Revenue=${totalRevenue}`);
    
    res.json({
      totalUsers,
      totalPlans,
      totalRecharges,
      totalRevenue
    });
  } catch (error) {
    console.error('❌ Admin stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalUsers: users.length,
    totalPlans: plans.length,
    totalRecharges: recharges.length,
    totalRevenue: recharges.reduce((sum, r) => sum + r.amount, 0)
  });
});

// Admin routes
app.get('/admin/users', async (req, res) => {
  try {
    const dbUsers = await User.find({}, '-password');
    const demoUsers = users.map(({ password, ...user }) => user);
    const allUsers = [...dbUsers, ...demoUsers];
    
    console.log(`👥 Found ${dbUsers.length} users in MongoDB + ${demoUsers.length} demo users`);
    res.json(allUsers);
  } catch (error) {
    console.error('❌ Admin users error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/admin/recharges', async (req, res) => {
  try {
    const dbRecharges = await Recharge.find()
      .populate('userId', 'name email')
      .populate('planId', 'name price data validity')
      .sort({ createdAt: -1 });
    
    console.log(`💳 Found ${dbRecharges.length} recharges in MongoDB`);
    res.json(dbRecharges);
  } catch (error) {
    console.error('❌ Admin recharges error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/users', (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json(usersWithoutPasswords);
});

app.get('/api/admin/recharges', (req, res) => {
  res.json(recharges);
});

app.get('/admin/operator-stats', async (req, res) => {
  try {
    const dbRecharges = await Recharge.find({ status: 'completed' });
    
    const stats = dbRecharges.reduce((acc, recharge) => {
      if (!acc[recharge.operator]) {
        acc[recharge.operator] = { _id: recharge.operator, count: 0, revenue: 0 };
      }
      acc[recharge.operator].count++;
      acc[recharge.operator].revenue += recharge.amount;
      return acc;
    }, {});
    
    console.log(`📊 Operator stats calculated from ${dbRecharges.length} recharges`);
    res.json(Object.values(stats).sort((a, b) => b.count - a.count));
  } catch (error) {
    console.error('❌ Operator stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/operator-stats', (req, res) => {
  const stats = recharges.reduce((acc, recharge) => {
    if (recharge.status === 'completed') {
      if (!acc[recharge.operator]) {
        acc[recharge.operator] = { _id: recharge.operator, count: 0, revenue: 0 };
      }
      acc[recharge.operator].count++;
      acc[recharge.operator].revenue += recharge.amount;
    }
    return acc;
  }, {});
  
  res.json(Object.values(stats).sort((a, b) => b.count - a.count));
});

// Create plan
app.post('/plans', async (req, res) => {
  try {
    const newPlan = new Plan({
      ...req.body,
      isActive: true
    });
    const savedPlan = await newPlan.save();
    console.log('✅ Plan created in MongoDB:', savedPlan._id);
    res.status(201).json(savedPlan);
  } catch (error) {
    console.error('❌ Plan creation error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/plans', async (req, res) => {
  try {
    const newPlan = new Plan({
      ...req.body,
      isActive: true
    });
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Recharge route
app.post('/recharge', async (req, res) => {
  try {
    const { userId, planId, phoneNumber, operator } = req.body;
    
    console.log('💳 Recharge request:', { userId, planId, phoneNumber, operator });
    
    // Find plan in MongoDB first, then fallback to in-memory
    let plan = await Plan.findById(planId);
    if (!plan) {
      plan = plans.find(p => p._id === planId);
      if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
      }
    }
    
    // Create recharge in MongoDB
    const recharge = new Recharge({
      userId,
      planId,
      phoneNumber,
      operator: operator || 'Jio',
      amount: plan.price,
      status: 'completed',
      transactionId: 'TXN' + Date.now()
    });
    
    const savedRecharge = await recharge.save();
    console.log('✅ Recharge saved to MongoDB:', savedRecharge._id);
    
    res.status(201).json(savedRecharge);
  } catch (error) {
    console.error('❌ Recharge error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/recharge', async (req, res) => {
  try {
    const { userId, planId, phoneNumber, operator } = req.body;
    
    // Find the plan
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    // Create recharge record
    const recharge = new Recharge({
      userId,
      planId,
      phoneNumber,
      operator: operator || 'Jio',
      amount: plan.price,
      status: 'completed',
      transactionId: 'TXN' + Date.now()
    });
    
    const savedRecharge = await recharge.save();
    res.status(201).json(savedRecharge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// AI Recommend route
app.post('/api/ai-recommend', (req, res) => {
  try {
    const { budget, usage, priority, validity, dataNeeds } = req.body;
    
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
      
      return {
        ...plan,
        score,
        aiReason: reasons.slice(0, 2).join(' and ') || 'good option for you'
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

// History route - fetch user's recharge history
app.get('/recharges/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('📊 Fetching recharges for user:', userId);
    
    // Get recharges from MongoDB with populated plan details
    const userRecharges = await Recharge.find({ userId })
      .populate('planId', 'name price data validity')
      .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${userRecharges.length} recharges in MongoDB for user ${userId}`);
    res.json(userRecharges);
  } catch (error) {
    console.error('❌ History fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const recharges = await Recharge.find({ userId })
      .populate('planId', 'name price data validity')
      .sort({ createdAt: -1 });
    
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ ${plans.length} plans loaded`);
  console.log(`✅ Ready to accept connections`);
});