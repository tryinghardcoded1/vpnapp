import React from 'react';
import { BRAND_NAME } from '../constants';
import { CheckIcon, CrownIcon } from '../components/Icons';

interface SubscriptionScreenProps {
  isPremium: boolean;
  onTogglePremium: () => void;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ isPremium, onTogglePremium }) => {
  const features = [
    'Access to all 50+ locations',
    'High-speed streaming servers',
    'Ad-blocker included',
    'Priority 24/7 Support'
  ];

  return (
    <div className="flex flex-col h-full pt-6 px-6 pb-20 overflow-y-auto">
       <div className="text-center mb-8">
         <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-4 shadow-lg shadow-amber-500/20">
           <CrownIcon className="w-8 h-8 text-white" />
         </div>
         <h2 className="text-2xl font-bold text-white">{BRAND_NAME} Premium</h2>
         <p className="text-slate-400 text-sm mt-2">Unlock the full potential of your internet.</p>
       </div>

       <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 mb-6 relative overflow-hidden">
         {isPremium && (
           <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
             Active
           </div>
         )}
         <h3 className="text-lg font-bold text-white">12 Months Plan</h3>
         <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-cyan-400">$4.99</span>
            <span className="text-slate-500">/month</span>
         </div>
         <p className="text-slate-400 text-xs mt-1">Billed $59.88 every year</p>

         <ul className="mt-6 space-y-3">
           {features.map((feature, idx) => (
             <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
               <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                 <CheckIcon className="w-3 h-3 text-cyan-400" />
               </div>
               {feature}
             </li>
           ))}
         </ul>

         <button
           onClick={onTogglePremium}
           className={`w-full mt-8 py-3 rounded-xl font-bold text-sm transition-all
             ${isPremium 
               ? 'bg-slate-700 text-slate-400 cursor-default' 
               : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'}`}
         >
           {isPremium ? 'Current Plan' : 'Upgrade Now'}
         </button>
       </div>

       <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 opacity-75">
         <h3 className="text-lg font-bold text-white">Free Plan</h3>
         <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white">$0.00</span>
            <span className="text-slate-500">/month</span>
         </div>
         <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-3 text-sm text-slate-400">
               <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                 <CheckIcon className="w-3 h-3 text-slate-400" />
               </div>
               Access to 5 basic locations
             </li>
             <li className="flex items-center gap-3 text-sm text-slate-400">
               <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                 <CheckIcon className="w-3 h-3 text-slate-400" />
               </div>
               Standard speed
             </li>
         </ul>
       </div>
    </div>
  );
};