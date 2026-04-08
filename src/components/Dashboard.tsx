import React from 'react';
import { motion } from 'motion/react';
import { Settings, User, Layout, Palette, Shield, Bell } from 'lucide-react';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';

interface DashboardProps {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateUser }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-24 h-24 rounded-3xl bg-zinc-800 flex items-center justify-center border border-white/10 overflow-hidden">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">{user.name}</h1>
          <p className="text-zinc-500 font-mono text-sm">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <div className="glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-blue-500" size={20} />
            <h2 className="text-lg font-semibold uppercase tracking-widest text-sm">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-sm text-zinc-400">Theme Mode</span>
              <div className="flex gap-2">
                {(['dark', 'midnight', 'cyber'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => onUpdateUser({ theme: t })}
                    className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all",
                      user.theme === t 
                        ? "bg-blue-600 text-white neon-glow" 
                        : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-sm text-zinc-400">Grid Layout</span>
              <div className="flex gap-2">
                {(['grid', 'list'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => onUpdateUser({ layout: l })}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      user.layout === l 
                        ? "bg-blue-600 text-white" 
                        : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    <Layout size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="text-blue-500" size={20} />
            <h2 className="text-lg font-semibold uppercase tracking-widest text-sm">Account</h2>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-zinc-500 group-hover:text-blue-400" />
                <span className="text-sm text-zinc-400">Security & Privacy</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-zinc-500 group-hover:text-blue-400" />
                <span className="text-sm text-zinc-400">Notifications</span>
              </div>
              <span className="text-[10px] font-bold bg-zinc-800 px-2 py-1 rounded text-zinc-500">OFF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        {[
          { label: 'Orders', value: '12' },
          { label: 'Wishlist', value: '4' },
          { label: 'Credits', value: '$240' },
        ].map((stat) => (
          <div key={stat.label} className="glass p-6 rounded-3xl border border-white/5 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
