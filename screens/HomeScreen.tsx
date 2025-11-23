import React, { useState, useEffect } from 'react';
import { ConnectionStatus, Server } from '../types';
import { MOCK_SERVERS, BRAND_NAME } from '../constants';
import { ChevronDownIcon, PowerIcon, GlobeIcon, LockIcon } from '../components/Icons';

interface HomeScreenProps {
  status: ConnectionStatus;
  setStatus: (status: ConnectionStatus) => void;
  selectedServer: Server;
  setSelectedServer: (server: Server) => void;
  isPremium: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  status,
  setStatus,
  selectedServer,
  setSelectedServer,
  isPremium
}) => {
  const [duration, setDuration] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (status === ConnectionStatus.CONNECTED) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setDuration(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleConnectToggle = () => {
    if (status === ConnectionStatus.DISCONNECTED) {
      setStatus(ConnectionStatus.CONNECTING);
      setTimeout(() => {
        setStatus(ConnectionStatus.CONNECTED);
      }, 2000);
    } else if (status === ConnectionStatus.CONNECTED) {
      setStatus(ConnectionStatus.DISCONNECTING);
      setTimeout(() => {
        setStatus(ConnectionStatus.DISCONNECTED);
      }, 1000);
    }
  };

  const handleServerSelect = (server: Server) => {
    if (server.premiumOnly && !isPremium) return;
    if (status === ConnectionStatus.CONNECTED) {
        // Disconnect before changing (simulated)
        setStatus(ConnectionStatus.DISCONNECTED);
    }
    setSelectedServer(server);
    setIsDropdownOpen(false);
  };

  const getStatusColor = () => {
    switch (status) {
      case ConnectionStatus.CONNECTED: return 'text-cyan-400';
      case ConnectionStatus.CONNECTING: return 'text-yellow-400';
      case ConnectionStatus.DISCONNECTED: return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="flex flex-col h-full pt-6 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">{BRAND_NAME}</h2>
          <div className={`text-xs font-medium flex items-center gap-2 ${getStatusColor()}`}>
            <span className={`w-2 h-2 rounded-full ${
              status === ConnectionStatus.CONNECTED ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
            }`}></span>
            {status}
          </div>
        </div>
        <div className="bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
           <span className="text-xs font-mono text-cyan-400">{selectedServer.protocols[0]}</span>
        </div>
      </div>

      {/* Main Action Area */}
      <div className="flex-1 flex flex-col items-center justify-center mb-12">
        
        {/* Connect Button */}
        <button
          onClick={handleConnectToggle}
          disabled={status === ConnectionStatus.CONNECTING || status === ConnectionStatus.DISCONNECTING}
          className="relative group"
        >
          {/* Outer Glow Ring */}
          <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-1000 ${
            status === ConnectionStatus.CONNECTED ? 'bg-cyan-500/30 scale-110' : 'bg-transparent'
          }`}></div>
          
          {/* Button Circle */}
          <div className={`w-48 h-48 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
            status === ConnectionStatus.CONNECTED 
              ? 'border-cyan-500 bg-slate-900 shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
              : 'border-slate-700 bg-slate-900 hover:border-slate-600'
          }`}>
            <PowerIcon className={`w-16 h-16 transition-all duration-500 ${
              status === ConnectionStatus.CONNECTED ? 'text-cyan-400' : 'text-slate-600'
            }`} />
          </div>
        </button>

        {/* Timer */}
        <div className="mt-8 text-center">
          <div className="text-4xl font-mono font-light text-white tracking-wider">
            {formatTime(duration)}
          </div>
          <p className="text-slate-500 text-sm mt-1">Session Duration</p>
        </div>
      </div>

      {/* Server Selector */}
      <div className="mb-6 relative z-20">
        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block tracking-wider">Selected Location</label>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedServer.flag}</span>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">{selectedServer.name}</div>
              <div className="text-slate-500 text-xs">{selectedServer.country}</div>
            </div>
          </div>
          <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown List */}
        {isDropdownOpen && (
          <div className="absolute bottom-full left-0 w-full mb-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto z-30">
            {MOCK_SERVERS.map((server) => (
              <button
                key={server.id}
                onClick={() => handleServerSelect(server)}
                className={`w-full p-4 flex items-center justify-between hover:bg-slate-800 transition-colors border-b border-slate-800/50 last:border-0 ${
                   selectedServer.id === server.id ? 'bg-slate-800' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{server.flag}</span>
                  <div className="text-left">
                    <div className="text-white font-medium text-sm">{server.name}</div>
                    <div className="text-slate-500 text-xs flex items-center gap-2">
                        {server.country} • {server.ping}ms
                    </div>
                  </div>
                </div>
                {server.premiumOnly && !isPremium && (
                  <LockIcon className="w-4 h-4 text-amber-500" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};