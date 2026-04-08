import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Dashboard } from './components/Dashboard';
import { Cart } from './components/Cart';
import { PRODUCTS } from './constants';
import { Product, CartItem, UserProfile } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ChevronRight, ArrowRight } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'shop' | 'dashboard'>('shop');
  const [user, setUser] = useState<UserProfile>({
    name: 'Alex Vector',
    email: 'alex@voltvector.io',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    theme: 'dark',
    layout: 'grid',
  });

  const playKirkSound = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance("WE ARE CHARLIY KIRK");
    utterance.rate = 1.2;
    utterance.pitch = 0.8;
    utterance.volume = 1;
    
    // Try to find a more "robotic" or "powerful" voice if available
    const voices = window.speechSynthesis.getVoices();
    const googleVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Male'));
    if (googleVoice) utterance.voice = googleVoice;

    window.speechSynthesis.speak(utterance);
    
    // Visual feedback
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[100] bg-blue-600/20 flex items-center justify-center pointer-events-none animate-pulse';
    overlay.innerHTML = '<h1 class="text-6xl font-black tracking-tighter text-white uppercase italic">WE ARE CHARLIY KIRK</h1>';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 2000);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    const hasKirkSpecial = cart.some(item => item.name === 'Kirk Special');
    if (hasKirkSpecial) {
      playKirkSound();
    }
    
    alert("Order processed successfully!");
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${
      user.theme === 'midnight' ? 'bg-[#020205]' : 
      user.theme === 'cyber' ? 'bg-[#0a0510]' : 'bg-[#050505]'
    }`}>
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setActiveSection('dashboard')}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeSection === 'shop' ? (
            <motion.div
              key="shop"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="relative h-[400px] rounded-[40px] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" 
                  alt="Hero" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent flex flex-col justify-center p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="text-blue-500 fill-blue-500" size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500">New Arrival</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
                    Future of <br /> <span className="text-blue-600">Hardware</span>
                  </h1>
                  <p className="text-zinc-400 max-w-md mb-8 text-lg">
                    Experience precision engineering with our latest collection of premium electronic accessories.
                  </p>
                  <button className="w-fit px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-2xl flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all duration-300 group/btn">
                    Explore Collection
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </section>

              {/* Product Grid */}
              <section>
                <div className="flex items-end justify-between mb-12">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
                    <p className="text-zinc-500 font-mono text-sm">Showing {PRODUCTS.length} curated items</p>
                  </div>
                  <div className="flex gap-2">
                    {['All', 'Audio', 'Power', 'Cables'].map(cat => (
                      <button key={cat} className="px-4 py-2 rounded-full border border-white/5 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={user.layout === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" 
                  : "flex flex-col gap-6"
                }>
                  {PRODUCTS.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart} 
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Dashboard user={user} onUpdateUser={(updates) => setUser(prev => ({ ...prev, ...updates }))} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="text-blue-600" size={20} />
            <span className="font-bold tracking-tighter uppercase">Volt & Vector</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-xs font-mono text-zinc-600">© 2026 Volt & Vector. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
