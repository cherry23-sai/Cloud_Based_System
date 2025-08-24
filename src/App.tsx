import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
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
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<LoginRegister />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/bill-payments" element={<BillPayments />} />
          <Route path="/services/setting-limit" element={<SettingLimit />} />
          <Route path="/services/track-electricity" element={<TrackElectricity />} />
          <Route path="/services/track-water" element={<TrackWater />} />
          <Route path="/services/transaction-history" element={<TransactionHistory />} />
          <Route path="/services/invoice-bills" element={<InvoiceBills />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;