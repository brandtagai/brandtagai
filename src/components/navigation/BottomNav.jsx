import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Settings, Upload, Shield } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Settings", icon: Settings, page: "Settings" },
  { name: "Upload", icon: Upload, page: "Upload" },
  { name: "Metadata", icon: Shield, page: "Metadata" }
];

export default function BottomNav() {
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
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 flex flex-col items-center"
              >
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
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
