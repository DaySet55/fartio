import React from 'react';
import { motion } from 'motion/react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isSpecial = product.name === 'Kirk Special';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden transition-all duration-500",
        isSpecial ? "border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]" : "hover:border-white/10"
      )}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isSpecial && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full neon-glow">
            Limited Edition
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold tracking-tight group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-mono text-zinc-400">${product.price}</span>
        </div>
        <p className="text-sm text-zinc-500 line-clamp-2 mb-6">
          {product.description}
        </p>

        <button
          onClick={() => onAddToCart(product)}
          className={cn(
            "w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300",
            isSpecial 
              ? "bg-blue-600 hover:bg-blue-500 text-white neon-glow" 
              : "bg-white/5 hover:bg-white/10 text-white border border-white/5"
          )}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};
