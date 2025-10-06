import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Shield, 
  Zap, 
  Smartphone, 
  CheckCircle, 
  ArrowRight,
  Eye,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Marketing() {
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

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden flex flex-col">
      {/* Skip Button */}
      <div className="flex justify-end p-6">
        <Button
          variant="ghost"
          onClick={skipToPaywall}
          className="text-cyan-300 hover:text-white"
        >
          Skip
        </Button>
      </div>

      {/* Content - Full Screen */}
      <div className="flex-1 px-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-center"
          >
            {(() => {
              const screen = marketingScreens[currentScreen];
              const IconComponent = screen.icon;
              
              return (
                <div className="space-y-8">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex justify-center"
                  >
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${screen.gradient} p-6 shadow-2xl`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                  </motion.div>

                  {/* Title & Subtitle */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h1 className="text-3xl font-bold mb-3">{screen.title}</h1>
                    <p className="text-lg text-cyan-200 mb-6">{screen.subtitle}</p>
                    <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
                      {screen.description}
                    </p>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-3"
                  >
                    {screen.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 justify-center"
                      >
                        <CheckCircle className="w-5 h-5 text-cyan-400" />
                        <span className="text-gray-200">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="p-6 space-y-4">
        <Button
          onClick={nextScreen}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg"
          size="lg"
        >
          {currentScreen === marketingScreens.length - 1 ? (
            "Get Started"
          ) : (
            <>
              Continue <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
        
        <div className="flex justify-center">
          <Button
            variant="ghost" 
            onClick={skipToPaywall}
            className="text-gray-400 hover:text-white"
          >
            Skip Introduction
          </Button>
        </div>
      </div>
    </div>
  );
}
