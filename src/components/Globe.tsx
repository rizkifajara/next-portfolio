"use client";
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Simple animated globe component without Three.js dependencies
export function SimpleGlobe() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Main globe sphere */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800 shadow-2xl relative overflow-hidden animate-spin-slow">
          {/* Globe surface pattern */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          {/* Continents simulation */}
          <div className="absolute top-1/4 left-1/3 w-8 h-12 bg-green-800/30 rounded-full transform rotate-12"></div>
          <div className="absolute top-1/2 right-1/4 w-6 h-8 bg-green-700/30 rounded-full transform -rotate-45"></div>
          <div className="absolute bottom-1/3 left-1/4 w-10 h-6 bg-green-800/30 rounded-full transform rotate-45"></div>
          <div className="absolute top-3/4 right-1/3 w-4 h-6 bg-green-600/30 rounded-full transform rotate-90"></div>
          
          {/* Connection lines/arcs */}
          <div className="absolute top-1/3 left-1/2 w-32 h-1 bg-cyan-400/50 rounded-full transform -rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-1 bg-blue-400/50 rounded-full transform rotate-12 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-1 bg-indigo-400/50 rounded-full transform rotate-60 animate-pulse delay-500"></div>
          
          {/* Orbital rings */}
          <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-ping"></div>
          <div className="absolute inset-2 border border-blue-400/20 rounded-full animate-ping delay-500"></div>
          <div className="absolute inset-4 border border-cyan-400/15 rounded-full animate-ping delay-1000"></div>
          
          {/* Data points */}
          <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-600"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-900"></div>
        </div>
        
        {/* Atmosphere glow */}
        <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl scale-110"></div>
        <div className="absolute inset-0 rounded-full bg-purple-400/10 blur-2xl scale-125"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 -right-3 w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-1300"></div>
        
        {/* Connection indicators */}
        <div className="absolute top-1/3 right-1/2 w-3 h-3 border border-cyan-400/50 rounded-full animate-ping delay-200"></div>
        <div className="absolute bottom-1/2 left-1/3 w-3 h-3 border border-blue-400/50 rounded-full animate-ping delay-800"></div>
      </div>
    </div>
  );
}

// Export the simple globe as the main component
export const Globe = SimpleGlobe; 