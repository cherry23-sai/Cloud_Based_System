import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Services from './pages/Services';
import BillPayments from './pages/services/BillPayments';
import SettingLimit from './pages/services/SettingLimit';
import TrackElectricity from './pages/services/TrackElectricity';
import TrackWater from './pages/services/TrackWater';
import TransactionHistory from './pages/services/TransactionHistory';
import InvoiceBills from './pages/services/InvoiceBills';
import Feedback from './pages/Feedback';
import Reviews from './pages/Reviews';
import About from './pages/About';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<LoginRegister />} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/admin" element={<AuthGuard><Admin /></AuthGuard>} />
            <Route path="/services" element={<AuthGuard><Services /></AuthGuard>} />
            <Route path="/services/bill-payments" element={<AuthGuard><BillPayments /></AuthGuard>} />
            <Route path="/services/setting-limit" element={<AuthGuard><SettingLimit /></AuthGuard>} />
            <Route path="/services/track-electricity" element={<AuthGuard><TrackElectricity /></AuthGuard>} />
            <Route path="/services/track-water" element={<AuthGuard><TrackWater /></AuthGuard>} />
            <Route path="/services/transaction-history" element={<AuthGuard><TransactionHistory /></AuthGuard>} />
            <Route path="/services/invoice-bills" element={<AuthGuard><InvoiceBills /></AuthGuard>} />
            <Route path="/feedback" element={<AuthGuard><Feedback /></AuthGuard>} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<AuthGuard><About /></AuthGuard>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;