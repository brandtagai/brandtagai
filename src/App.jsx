import React, { useState } from 'react';
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

// Inline SVG Icons
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

const Settings2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Upload2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const Shield2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Button = ({ children, onClick, className = "", disabled = false }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    className={`px-4 py-2 rounded transition-colors ${className}`}
  >
    {children}
  </button>
);

// Marketing Screen Data
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

// MARKETING COMPONENT
const Marketing = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
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

// PAYWALL COMPONENT
const Paywall = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$9.99',
      period: '/month',
      features: ['Unlimited watermarks', 'HD quality', 'Priority support']
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '$59.99',
      period: '/year',
      popular: true,
      features: ['Unlimited watermarks', 'HD quality', 'Priority support', '50% savings']
    }
  ];

  const handlePurchase = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    navigate(createPageUrl("Upload"));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col">
      <div className="flex justify-between items-center p-6">
        <Button
          onClick={() => navigate(createPageUrl("Marketing"))}
          className="text-cyan-300 hover:text-white bg-transparent"
        >
          Back
        </Button>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Choose Your Plan</h1>
          <p className="text-gray-300">Unlock unlimited watermarking</p>
        </div>

        <div className="space-y-4 max-w-sm mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-cyan-400 bg-cyan-400/10'
                  : 'border-slate-600 bg-slate-800/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="my-3">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 justify-center">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <Button
          onClick={handlePurchase}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : `Subscribe ${selectedPlan === 'monthly' ? '$9.99/mo' : '$59.99/yr'}`}
        </Button>
        
        <Button
          onClick={() => {}}
          className="w-full text-gray-400 hover:text-white bg-transparent"
        >
          Restore Purchases
        </Button>
      </div>
    </div>
  );
};

// OTHER PAGE COMPONENTS
const Settings = () => <div className="p-4 text-white">Settings Page</div>;
const Upload = () => <div className="p-4 text-white">Upload Page</div>;
const Metadata = () => <div className="p-4 text-white">Metadata Page</div>;

// BOTTOM NAVIGATION
const navItems = [
  { name: "Settings", icon: Settings2, page: "Settings" },
  { name: "Upload", icon: Upload2, page: "Upload" },
  { name: "Metadata", icon: Shield2, page: "Metadata" }
];

const BottomNav = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-white/20 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === createPageUrl(item.page);
          const IconComponent = item.icon;
          
          return (
            <Link
              key={item.name}
              to={createPageUrl(item.page)}
              className="relative flex flex-col items-center py-2 px-4 min-w-0 flex-1"
            >
              <div className="relative z-10 flex flex-col items-center transition-transform duration-150 hover:scale-110 active:scale-95">
                <IconComponent 
                  className={`w-6 h-6 mb-1 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-gray-400'
                  }`} 
                />
                <span 
                  className={`text-xs font-medium transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-gray-400'
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// MAIN APP
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
