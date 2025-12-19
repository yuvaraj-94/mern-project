import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { testConnection } from './services/apiService';
import { Navbar } from './components/Navbar';
import { DynamicBackground } from './components/DynamicBackground';
import { Auth } from './pages/Auth';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Recharge } from './pages/Recharge';
import { History } from './pages/History';
import { Admin } from './pages/Admin';
import { Support } from './pages/Support';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Plans } from './pages/Plans';
import { Payment } from './pages/Payment';
import { PaymentResult } from './pages/PaymentResult';
import { AdminDashboard } from './pages/AdminDashboard';
import { AIRecommender } from './pages/AIRecommender';
import { AdminLogin } from './pages/AdminLogin';

const ProtectedRoute = ({ children }) => {
   const user = localStorage.getItem('volt_user');
   if (!user) {
      return <Navigate to="/landing" replace />;
   }
   return <>{children}</>;
};

const AdminRoute = ({ children }) => {
   const userString = localStorage.getItem('volt_user');
   if (!userString) return <Navigate to="/landing" replace />;
   try {
      const user = JSON.parse(userString);
      if (user.role !== 'admin') return <Navigate to="/" replace />;
   } catch {
      return <Navigate to="/landing" replace />;
   }
   return <>{children}</>;
};

const ProtectedAdminRoute = ({ children }) => {
   const isAdminAuthenticated = localStorage.getItem('admin_authenticated');
   if (!isAdminAuthenticated) {
      return <Navigate to="/admin-login" replace />;
   }
   return <>{children}</>;
};

const Layout = ({ children }) => {
   return (
      <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
         <DynamicBackground />
         <div className="relative z-10">
            <Navbar />
            <main className="flex-grow">
               {children}
            </main>
         </div>
         <footer className="bg-black/80 backdrop-blur-sm border-t border-yellow-500/20 py-8">
            <div className="max-w-7xl mx-auto px-4">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                     <h3 className="font-bold text-yellow-400 mb-4">About</h3>
                     <ul className="space-y-2 text-gray-300 text-sm">
                        <li><Link to="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
                        <li><Link to="/about" className="hover:text-yellow-400 transition">Blog</Link></li>
                        <li><Link to="/about" className="hover:text-yellow-400 transition">Careers</Link></li>
                     </ul>
                  </div>
                  <div>
                     <h3 className="font-bold text-yellow-400 mb-4">Support</h3>
                     <ul className="space-y-2 text-gray-300 text-sm">
                        <li><Link to="/support" className="hover:text-yellow-400 transition">Help Center</Link></li>
                        <li><Link to="/support" className="hover:text-yellow-400 transition">Contact Us</Link></li>
                        <li><Link to="/support" className="hover:text-yellow-400 transition">FAQ</Link></li>
                     </ul>
                  </div>
                  <div>
                     <h3 className="font-bold text-yellow-400 mb-4">Legal</h3>
                     <ul className="space-y-2 text-gray-300 text-sm">
                        <li><Link to="/privacy" className="hover:text-yellow-400 transition">Privacy</Link></li>
                        <li><Link to="/privacy" className="hover:text-yellow-400 transition">Terms</Link></li>
                        <li><Link to="/support" className="hover:text-yellow-400 transition">Security</Link></li>
                     </ul>
                  </div>
               </div>
               <div className="border-t border-yellow-500/20 pt-8 text-center text-gray-400 text-sm">
                  © 2024 Mobi-Charge. All rights reserved. ⚡
               </div>
            </div>
         </footer>
      </div>
   );
}

function App() {
  useEffect(() => {
    // Test backend connection on app start
    testConnection()
      .then(data => console.log('Backend connected:', data))
      .catch(err => console.log('Backend connection failed:', err));
  }, []);

  return (
    <Router>
       <Routes>
         <Route path="/landing" element={
           <div className="min-h-screen bg-black relative overflow-hidden">
             <DynamicBackground />
             <div className="relative z-10">
               <Landing />
             </div>
           </div>
         } />
         <Route path="/login" element={
           <div className="min-h-screen bg-black relative overflow-hidden">
             <DynamicBackground />
             <div className="relative z-10">
               <Login />
             </div>
           </div>
         } />
         <Route path="/register" element={
           <div className="min-h-screen bg-black relative overflow-hidden">
             <DynamicBackground />
             <div className="relative z-10">
               <Register />
             </div>
           </div>
         } />
         <Route path="/auth" element={
           <div className="min-h-screen bg-black relative overflow-hidden">
             <DynamicBackground />
             <div className="relative z-10">
               <Auth />
             </div>
           </div>
         } />
         
         <Route path="/" element={
           <ProtectedRoute>
             <Layout>
               <Recharge />
             </Layout>
           </ProtectedRoute>
         } />
         
         <Route path="/admin" element={
           <AdminRoute>
             <Layout>
               <Admin />
             </Layout>
           </AdminRoute>
         } />
         
         <Route path="/admin-login" element={
           <div className="min-h-screen bg-black relative overflow-hidden">
             <DynamicBackground />
             <div className="relative z-10">
               <AdminLogin />
             </div>
           </div>
         } />

         <Route path="/admin-dashboard" element={
           <ProtectedAdminRoute>
             <div className="min-h-screen bg-black relative overflow-hidden">
               <DynamicBackground />
               <div className="relative z-10">
                 <AdminDashboard />
               </div>
             </div>
           </ProtectedAdminRoute>
         } />
         
         <Route path="/history" element={
           <ProtectedRoute>
             <Layout>
               <History />
             </Layout>
           </ProtectedRoute>
         } />

         <Route path="/support" element={
           <Layout>
             <Support />
           </Layout>
         } />

         <Route path="/about" element={
           <Layout>
             <About />
           </Layout>
         } />

         <Route path="/privacy" element={
           <Layout>
             <Privacy />
           </Layout>
         } />

         <Route path="/plans" element={
           <div className="min-h-screen bg-black relative overflow-hidden">
             <DynamicBackground />
             <div className="relative z-10">
               <Plans />
             </div>
           </div>
         } />

         <Route path="/payment" element={
           <ProtectedRoute>
             <div className="min-h-screen bg-black relative overflow-hidden">
               <DynamicBackground />
               <div className="relative z-10">
                 <Payment />
               </div>
             </div>
           </ProtectedRoute>
         } />

         <Route path="/payment-result" element={
           <ProtectedRoute>
             <div className="min-h-screen bg-black relative overflow-hidden">
               <DynamicBackground />
               <div className="relative z-10">
                 <PaymentResult />
               </div>
             </div>
           </ProtectedRoute>
         } />

         <Route path="/ai-recommender" element={
           <div className="min-h-screen bg-black relative overflow-hidden">
             <DynamicBackground />
             <div className="relative z-10">
               <AIRecommender />
             </div>
           </div>
         } />

         <Route path="*" element={<Navigate to="/landing" replace />} />
       </Routes>
    </Router>
  );
}

export default App;
