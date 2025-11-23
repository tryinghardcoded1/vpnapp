import React from 'react';
import { ScreenView } from '../types';
import { GlobeIcon, SpeedIcon, CrownIcon, UserIcon, PowerIcon } from './Icons';

interface NavbarProps {
  currentScreen: ScreenView;
  onNavigate: (screen: ScreenView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: ScreenView.HOME, icon: PowerIcon, label: 'Connect' },
    { id: ScreenView.SPEED_TEST, icon: SpeedIcon, label: 'Speed' },
    { id: ScreenView.SUBSCRIPTION, icon: CrownIcon, label: 'Premium' },
    { id: ScreenView.PROFILE, icon: UserIcon, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};