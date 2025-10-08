import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
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
      <Outlet />
    </div>
  );
}
