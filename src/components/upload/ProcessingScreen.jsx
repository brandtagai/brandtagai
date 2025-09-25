import React from "react";
import { motion } from "framer-motion";

export default function ProcessingScreen({ progress = 0 }) {
  // SVG paths for a stylized fingerprint
  const fingerprintPaths = [
    "M 50 20 A 30 30 0 1 1 49.99 20",
    "M 50 26 A 24 24 0 0 1 50 74",
    "M 50 26 A 24 24 0 1 0 49.99 26", 
    "M 50 32 A 18 18 0 1 1 49.99 32",
    "M 50 38 A 12 12 0 0 1 50 62",
    "M 50 44 A 6 6 0 1 1 49.99 44",
  ];

  // Calculate circumference for progress bar
  const radius = 145;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
      >
        {/* Pulsing background glow */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl"
        />

        {/* Circular Progress Bar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
            <circle
              cx="150"
              cy="150"
              r={radius}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="150"
              cy="150"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: progressOffset }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06d6a0" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Fingerprint SVG Container with circular clip mask */}
        <div className="absolute inset-4 rounded-full overflow-hidden flex items-center justify-center">
          <motion.svg
            className="w-full h-full text-cyan-400"
            viewBox="10 10 80 80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {fingerprintPaths.map((path, i) => (
              <motion.path
                key={i}
                d={path}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  delay: 0.5 + i * 0.1,
                  duration: 1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.svg>
        </div>

        {/* Scanning Line Animation */}
        <motion.div 
            className="absolute left-4 right-4 h-1 bg-cyan-300/80 blur-sm shadow-xl shadow-cyan-300 rounded-full"
            style={{ top: '50%' }}
            animate={{ top: ['20%', '80%', '20%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
