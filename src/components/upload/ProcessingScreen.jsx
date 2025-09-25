import React from "react";

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
      <style>{`
        @keyframes fadeScaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        
        @keyframes progressStroke {
          from {
            stroke-dashoffset: ${circumference};
          }
          to {
            stroke-dashoffset: ${progressOffset};
          }
        }
        
        @keyframes fingerprintFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.6;
          }
        }
        
        @keyframes drawPath {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes scanLine {
          0%, 100% {
            top: 20%;
          }
          50% {
            top: 80%;
          }
        }
        
        .container {
          animation: fadeScaleIn 0.5s ease-in-out;
        }
        
        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        
        .progress-circle {
          stroke-dasharray: ${circumference};
          stroke-dashoffset: ${circumference};
          animation: progressStroke 0.5s ease-out 0s forwards;
        }
        
        .fingerprint-svg {
          animation: fingerprintFadeIn 1s ease-in-out 0.3s forwards;
          opacity: 0;
        }
        
        .fingerprint-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        
        .fingerprint-path:nth-child(1) { animation: drawPath 1s ease-in-out 0.5s forwards; }
        .fingerprint-path:nth-child(2) { animation: drawPath 1s ease-in-out 0.6s forwards; }
        .fingerprint-path:nth-child(3) { animation: drawPath 1s ease-in-out 0.7s forwards; }
        .fingerprint-path:nth-child(4) { animation: drawPath 1s ease-in-out 0.8s forwards; }
        .fingerprint-path:nth-child(5) { animation: drawPath 1s ease-in-out 0.9s forwards; }
        .fingerprint-path:nth-child(6) { animation: drawPath 1s ease-in-out 1.0s forwards; }
        
        .scan-line {
          animation: scanLine 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="container relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        {/* Pulsing background glow */}
        <div className="pulse-glow absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl" />
        
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
            <circle
              cx="150"
              cy="150"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="progress-circle"
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
          <svg
            className="fingerprint-svg w-full h-full text-cyan-400"
            viewBox="10 10 80 80"
          >
            {fingerprintPaths.map((path, i) => (
              <path
                key={i}
                d={path}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="fingerprint-path"
              />
            ))}
          </svg>
        </div>
        
        {/* Scanning Line Animation */}
        <div className="scan-line absolute left-4 right-4 h-1 bg-cyan-300/80 blur-sm shadow-xl shadow-cyan-300 rounded-full" />
      </div>
    </div>
  );
}
