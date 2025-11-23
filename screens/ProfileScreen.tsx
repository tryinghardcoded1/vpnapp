import React, { useState } from 'react';
import { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onUpdateUser, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempEmail, setTempEmail] = useState(user.email);

  const handleSave = () => {
    onUpdateUser({ ...user, name: tempName, email: tempEmail });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full pt-6 px-6">
       <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>

       <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-6 flex items-center gap-4">
         <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
           {user.name.charAt(0).toUpperCase()}
         </div>
         <div>
           <h3 className="text-white font-bold text-lg">{user.name}</h3>
           <p className="text-slate-500 text-sm">{user.email}</p>
           {user.isPremium ? (
             <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase border border-amber-500/20">
               Premium
             </span>
           ) : (
             <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-700 text-slate-400 text-[10px] font-bold uppercase">
               Free User
             </span>
           )}
         </div>
       </div>

       <div className="space-y-4">
         <div>
           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
           <input 
             type="text" 
             value={isEditing ? tempName : user.name}
             onChange={(e) => setTempName(e.target.value)}
             disabled={!isEditing}
             className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors
                ${isEditing ? 'border-cyan-500 ring-1 ring-cyan-500' : 'border-slate-800 text-slate-400'}`}
           />
         </div>

         <div>
           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
           <input 
             type="email" 
             value={isEditing ? tempEmail : user.email}
             onChange={(e) => setTempEmail(e.target.value)}
             disabled={!isEditing}
             className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors
                ${isEditing ? 'border-cyan-500 ring-1 ring-cyan-500' : 'border-slate-800 text-slate-400'}`}
           />
         </div>
       </div>

       <div className="mt-8 space-y-3">
         {isEditing ? (
           <button 
             onClick={handleSave}
             className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 rounded-xl transition-colors"
           >
             Save Changes
           </button>
         ) : (
           <button 
             onClick={() => setIsEditing(true)}
             className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl border border-slate-700 transition-colors"
           >
             Edit Profile
           </button>
         )}

         <button 
            onClick={onLogout}
            className="w-full bg-transparent hover:bg-red-500/10 text-red-500 font-bold py-3 rounded-xl border border-red-500/20 transition-colors"
         >
           Log Out
         </button>
       </div>
    </div>
  );
};