export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'audio' | 'power' | 'cables' | 'special';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  theme: 'dark' | 'midnight' | 'cyber';
  layout: 'grid' | 'list';
}
