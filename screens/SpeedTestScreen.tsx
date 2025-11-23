import React, { useState, useEffect, useRef } from 'react';
import { ConnectionStatus } from '../types';
import { BRAND_NAME } from '../constants';

interface SpeedTestScreenProps {
  status: ConnectionStatus;
}

export const SpeedTestScreen: React.FC<SpeedTestScreenProps> = ({ status }) => {
  const [isTesting, setIsTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Refs to handle animation loop
  const requestRef = useRef<number>();

  const startTest = () => {
    if (isTesting) return;
    setIsTesting(true);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setProgress(0);

    // Simulate test phases
    let startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const totalDuration = 6000; // 6 seconds total

      const currentProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(currentProgress);

      if (elapsed < 3000) {
        // Download Phase
        setDownloadSpeed(Math.random() * 50 + 100 + (Math.random() * 20)); // Random 100-170 range
      } else if (elapsed < 6000) {
        // Upload Phase
        setUploadSpeed(Math.random() * 30 + 40 + (Math.random() * 10)); // Random 40-80 range
      } else {
        // Finish
        setIsTesting(false);
        setDownloadSpeed(142.5); // Final result
        setUploadSpeed(54.2);    // Final result
        return; 
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-full pt-6 px-6">
       <h2 className="text-2xl font-bold text-white mb-6">{BRAND_NAME} Speed</h2>
       
       <div className="flex-1 flex flex-col justify-center">
         
         {/* Gauge Visualization */}
         <div className="relative w-64 h-64 mx-auto mb-12">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#1e293b"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#06b6d4"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 - (progress / 100) * 2 * Math.PI * 120}
                className="transition-all duration-75 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white tabular-nums">
                {isTesting 
                   ? (progress < 50 ? downloadSpeed.toFixed(1) : uploadSpeed.toFixed(1)) 
                   : downloadSpeed > 0 ? downloadSpeed.toFixed(1) : '0.0'}
              </span>
              <span className="text-slate-400 text-sm mt-1">Mbps</span>
              <span className="text-cyan-400 text-xs font-bold uppercase mt-2">
                {isTesting ? (progress < 50 ? 'Downloading...' : 'Uploading...') : 'Idle'}
              </span>
            </div>
         </div>

         {/* Results Grid */}
         <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
              <p className="text-slate-500 text-xs uppercase mb-1">Download</p>
              <p className={`text-xl font-bold ${isTesting && progress < 50 ? 'text-cyan-400 animate-pulse' : 'text-white'}`}>
                {downloadSpeed.toFixed(1)} <span className="text-xs font-normal text-slate-500">Mbps</span>
              </p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
              <p className="text-slate-500 text-xs uppercase mb-1">Upload</p>
              <p className={`text-xl font-bold ${isTesting && progress >= 50 ? 'text-purple-400 animate-pulse' : 'text-white'}`}>
                {uploadSpeed.toFixed(1)} <span className="text-xs font-normal text-slate-500">Mbps</span>
              </p>
            </div>
         </div>

         {status !== ConnectionStatus.CONNECTED && (
           <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6 text-center">
             <p className="text-amber-200 text-xs">Connect to VPN to test secure speed.</p>
           </div>
         )}

         <button
           onClick={startTest}
           disabled={isTesting}
           className={`w-full py-4 rounded-xl font-bold text-white uppercase tracking-wider shadow-lg transition-all
             ${isTesting 
               ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
               : 'bg-cyan-500 hover:bg-cyan-400 hover:shadow-cyan-500/25 active:scale-95'}`}
         >
           {isTesting ? 'Testing...' : 'Start Test'}
         </button>
       </div>
    </div>
  );
};