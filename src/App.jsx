import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout';
import Marketing from '../pages/Marketing';
import Paywall from '../pages/Paywall';
import Settings from '../pages/Settings';
import Upload from '../pages/Upload';
import Metadata from '../pages/Metadata';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/marketing" replace />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="paywall" element={<Paywall />} />
          <Route path="settings" element={<Settings />} />
          <Route path="upload" element={<Upload />} />
          <Route path="metadata" element={<Metadata />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
