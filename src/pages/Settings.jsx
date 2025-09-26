import React, { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [quality, setQuality] = useState('high');

  const toggleSwitch = (value, setter) => {
    setter(!value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pb-20">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Settings</h1>
        
        <div className="space-y-6 max-w-md mx-auto">
          {/* Notifications */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Notifications</h3>
                <p className="text-sm text-gray-400">Get alerts about processing</p>
              </div>
              <button
                onClick={() => toggleSwitch(notifications, setNotifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Auto Save */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Auto Save</h3>
                <p className="text-sm text-gray-400">Automatically save watermarked images</p>
              </div>
              <button
                onClick={() => toggleSwitch(autoSave, setAutoSave)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  autoSave ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    autoSave ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Quality Settings */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Output Quality</h3>
            <div className="space-y-2">
              {['high', 'medium', 'low'].map((option) => (
                <button
                  key={option}
                  onClick={() => setQuality(option)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    quality === option
                      ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300'
                      : 'bg-slate-700/50 border border-transparent text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize font-medium">{option}</span>
                    {quality === option && (
                      <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-3">Account</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-slate-700/50 rounded-lg text-left hover:bg-slate-700 transition-colors">
                <span className="text-gray-300">Manage Subscription</span>
              </button>
              <button className="w-full p-3 bg-slate-700/50 rounded-lg text-left hover:bg-slate-700 transition-colors">
                <span className="text-gray-300">Privacy Policy</span>
              </button>
              <button className="w-full p-3 bg-slate-700/50 rounded-lg text-left hover:bg-slate-700 transition-colors">
                <span className="text-gray-300">Terms of Service</span>
              </button>
            </div>
          </div>

          {/* Sign Out */}
          <button className="w-full p-4 bg-red-600/20 border border-red-500 rounded-xl text-red-400 font-semibold hover:bg-red-600/30 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
