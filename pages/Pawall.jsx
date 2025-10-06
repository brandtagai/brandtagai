
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Purchase } from "@/entities/Purchase";
import { 
  Crown, 
  Zap, 
  Star, 
  Check, 
  ArrowLeft,
  Shield,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    id: 'brandtag_single',
    name: 'Single Image',
    price: 0.99,
    credits: 1,
    popular: false,
    features: [
      'Process 1 image',
      'Logo watermarking',
      'Metadata embedding',
      'Social media optimization'
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'brandtag_bundle_20', 
    name: '20 Images Bundle',
    price: 9.99,
    credits: 20,
    popular: true,
    savings: 'Save 50%',
    features: [
      'Process 20 images',
      'Batch processing',
      'Logo watermarking',
      'Metadata embedding', 
      'Social media optimization',
      'Priority processing'
    ],
    gradient: 'from-purple-500 to-pink-500'
  }
];

export default function Paywall() {
  const [selectedPlan, setSelectedPlan] = useState('brandtag_bundle_20');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const triggerPayment = async (productId, amount) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create purchase record
      const credits = productId === 'brandtag_single' ? 1 : 20;
      await Purchase.create({
        product_id: productId,
        amount: amount,
        images_remaining: credits,
        purchase_date: new Date().toISOString()
      });
      
      // Navigate to settings page
      navigate(createPageUrl("Settings"));
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const restorePurchases = async () => {
    // In a real app, this would check with payment processor
    const purchases = await Purchase.list('-purchase_date', 1);
    if (purchases.length > 0) {
      navigate(createPageUrl("Settings"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="relative px-6 pt-10 pb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center relative"
        >
          <motion.div
            className="absolute left-0"
            style={{ top: '18px' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(createPageUrl("Marketing"))}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-8 h-8" />
            </Button>
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-3">Unlock Professional<br />Watermarking</h2>
          <p className="text-gray-300 max-w-sm mx-auto">
            Protect your images with invisible metadata and smart logo placement
          </p>
        </motion.div>
      </div>

      {/* Pricing Plans */}
      <div className="px-6 space-y-4 mb-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-cyan-400 bg-white/10'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {/* Add spacer only if NOT popular to align with tagged card */}
                    {!plan.popular && <div className="h-6" />}
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    {plan.savings ? (
                      <span className="text-green-400 text-sm font-medium">{plan.savings}</span>
                    ) : (
                      <div className="h-5" /> /* Spacer for savings text */
                    )}
                  </div>
                  <div className="text-right">
                    {/* Add spacer only if NOT popular to align with tagged card */}
                    {!plan.popular && <div className="h-6" />}
                    <div className="text-3xl font-bold text-white">${plan.price}</div>
                    <div className="text-gray-400 text-sm">{plan.credits} image{plan.credits > 1 ? 's' : ''}</div>
                  </div>
                </div>
                
                <div className="space-y-2 mt-2">
                  {plan.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-cyan-400" />
                      <span className="text-gray-200 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Purchase Button */}
      <div className="px-6 space-y-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={() => {
              const plan = plans.find(p => p.id === selectedPlan);
              triggerPayment(plan.id, plan.price);
            }}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg text-lg"
            size="lg"
          >
            {isProcessing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 mr-2"
                >
                  <Sparkles className="w-full h-full" />
                </motion.div>
                Processing...
              </>
            ) : (
              `Purchase ${plans.find(p => p.id === selectedPlan)?.name} - $${plans.find(p => p.id === selectedPlan)?.price}`
            )}
          </Button>
        </motion.div>

        <Button
          variant="ghost"
          onClick={restorePurchases}
          className="w-full text-gray-400 hover:text-white"
        >
          Restore Purchases
        </Button>
      </div>
    </div>
  );
}
