import React from 'react';
import { ShoppingCart, User, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
  activeSection: 'shop' | 'dashboard';
  onSectionChange: (section: 'shop' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onCartClick,
  onProfileClick,
  activeSection,
  onSectionChange,
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onSectionChange('shop')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 neon-glow">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">Volt & Vector</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onSectionChange('shop')}
            className={cn(
              "text-sm font-medium uppercase tracking-widest transition-colors",
              activeSection === 'shop' ? "text-blue-500" : "text-zinc-400 hover:text-white"
            )}
          >
            Shop
          </button>
          <button 
            onClick={() => onSectionChange('dashboard')}
            className={cn(
              "text-sm font-medium uppercase tracking-widest transition-colors",
              activeSection === 'dashboard' ? "text-blue-500" : "text-zinc-400 hover:text-white"
            )}
          >
            Dashboard
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCartClick}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={onProfileClick}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};
