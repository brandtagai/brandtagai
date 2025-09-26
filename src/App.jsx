import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';

// Your real Layout component
const createPageUrl = (pageName) => {
  return `/${pageName.toLowerCase()}`;
};

const Layout = ({ children, currentPageName }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <style>{`
        :root {
          --primary-navy: #1e3a8a;
          --accent-cyan: #06d6a0;
          --electric-blue: #3b82f6;
          --dark-navy: #0f172a;
        }
      `}</style>
      {children}
    </div>
  );
};

// Your real Marketing component with inline icons
const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Globe = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const Button = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded transition-colors ${className}`}>
    {children}
  </button>
);

const marketingScreens = [
  {
    id: 1,
    title: "Professional Watermarking",
    subtitle: "Protect your brand with invisible precision",
    description: "Add your logo and business name to images with intelligent positioning that adapts to any photo composition.",
    icon: Shield,
    features: [
      "Smart logo positioning",
      "Brand name overlay", 
      "Batch processing",
      "Professional quality"
    ],
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    id: 2, 
    title: "Invisible Metadata Protection",
    subtitle: "Copyright protection that can't be removed",
    description: "Embed invisible metadata directly into your images for permanent copyright protection and ownership verification.",
    icon: Eye,
    features: [
      "Invisible embedding",
      "Copyright protection",
      "Ownership verification", 
      "Third-party validation"
    ],
    gradient: "from-purple-600 to-blue-500"
  },
  {
    id: 3,
    title: "Social Media Ready", 
    subtitle: "Optimized for every platform",
    description: "Automatic crop detection ensures your watermarks stay visible across all social media platforms.",
    icon: Globe,
    features: [
      "Auto-crop detection",
      "Platform optimization",
      "Visibility guaranteed",
      "One-click processing"
    ],
    gradient: "from-cyan-500 to-emerald-500"
  }
];

const Marketing = () => {
  const [currentScreen, setCurrentScreen] = React.useState(0);
  const navigate = useNavigate();

  const nextScreen = () => {
    if (currentScreen < marketingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      navigate(createPageUrl("Paywall"));
    }
  };

  const skipToPaywall = () => {
    navigate(createPageUrl("Paywall"));
  };

  const screen = marketingScreens[currentScreen];
  const IconComponent = screen.icon;

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden flex flex-col">
      <div className="flex justify-end p-6">
        <Button
          onClick={skipToPaywall}
          className="text-cyan-300 hover:text-white bg-transparent"
        >
          Skip
        </Button>
      </div>

      <div className="flex-1 px-6 flex flex-col justify-center">
        <div className="text-center">
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${screen.gradient} p-6 shadow-2xl`}>
                <IconComponent className="w-full h-full text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-3">{screen.title}</h1>
              <p className="text-lg text-cyan-200 mb-6">{screen.subtitle}</p>
              <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
                {screen.description}
              </p>
            </div>

            <div className="space-y-3">
              {screen.features.map((feature, index) => (
                <div key={feature} className="flex items-center gap-3 justify-center">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <Button
          onClick={nextScreen}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg"
        >
          {currentScreen === marketingScreens.length - 1 ? (
            "Get Started"
          ) : (
            <div className="flex items-center justify-center">
              Continue <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          )}
        </Button>
        
        <div className="flex justify-center">
          <Button
            onClick={skipToPaywall}
            className="text-gray-400 hover:text-white bg-transparent"
          >
            Skip Introduction
          </Button>
        </div>
      </div>
    </div>
  );
};

// Simple page components
const Paywall = () => <div className="p-4 text-white">Paywall Page</div>;
const Settings
