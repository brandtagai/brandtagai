// Paywall component
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
                    <div key={index} className="flex items-center gap-2">
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
