import { create } from 'zustand';
import type { CartItem, FoodItem } from '@/lib/index';

interface CartStore {
  items: CartItem[];
  addItem: (food: FoodItem, quantity?: number, notes?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (food, quantity = 1, notes = '') => {
    set((state) => {
      const existing = state.items.find((i) => i.id === food.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === food.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return { items: [...state.items, { ...food, quantity, notes }] };
    });
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
