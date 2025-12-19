const API_BASE_URL = 'http://localhost:5001';

// Add CORS headers for development
const fetchWithCORS = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...options.headers,
    },
  });
};

// Test backend connection
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Backend connection error:', error);
    throw error;
  }
};

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Register user
export const registerUser = async (userData) => {
  return apiCall('/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

// Login user
export const loginUser = async (credentials) => {
  return apiCall('/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
};

// Admin APIs
export const getAdminStats = () => apiCall('/admin/stats');
export const getAllUsers = () => apiCall('/admin/users');
export const getAllRecharges = () => apiCall('/admin/recharges');
export const getOperatorStats = () => apiCall('/admin/operator-stats');

// Plan APIs
export const getPlans = () => apiCall('/plans');
export const createPlan = (planData) => apiCall('/plans', {
  method: 'POST',
  body: JSON.stringify(planData)
});
export const updatePlan = (id, planData) => apiCall(`/plans/${id}`, {
  method: 'PUT',
  body: JSON.stringify(planData)
});
export const deletePlan = (id) => apiCall(`/plans/${id}`, { method: 'DELETE' });

// Recharge APIs
export const createRecharge = (rechargeData) => apiCall('/recharge', {
  method: 'POST',
  body: JSON.stringify(rechargeData)
});
export const getUserRecharges = (userId) => apiCall(`/recharges/${userId}`);