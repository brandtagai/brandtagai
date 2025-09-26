import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Simple Layout component
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-900">
    {children}
  </div>
);

// Simple page components
const Marketing = () => <div className="p-4 text-white">Marketing Page</div>;
const Paywall = () => <div className="p-4 text-white">Paywall Page</div>;
const Settings = () => <div className="p-4 text-white">Settings Page</div>;
const Upload = () => <div className="p-4 text-white">Upload Page</div>;
const Metadata = () => <div className="p-4 text-white">Metadata Page</div>;

// BottomNav component (inlined)
const BottomNav = () => {
  const Settings = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const Upload = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );

  const Shield = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-white/20 shadow-lg">
      <div className="flex justify-around items-center py-2">
        <a href="/settings" className="flex flex-col items-center py-2 px-4">
          <Settings className="w-6 h-6 mb-1 text-gray-400" />
          <span className="text-xs text-gray-400">Settings</span>
        </a>
        <a href="/upload" className="flex flex-col items-center py-2 px-4">
          <Upload className="w-6 h-6 mb-1 text-gray-400" />
          <span className="text-xs text-gray-400">Upload</span>
        </a>
        <a href="/metadata" className="flex flex-col items-center py-2 px-4">
          <Shield className="w-6 h-6 mb-1 text-gray-400" />
          <span className="text-xs text-gray-400">Metadata</span>
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/marketing" replace />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/metadata" element={<Metadata />} />
        </Routes>
        <BottomNav />
      </Layout>
    </Router>
  );
}

export default App;
