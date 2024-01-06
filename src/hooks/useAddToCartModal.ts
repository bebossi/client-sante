import { create } from 'zustand';
import { Product } from '../interfaces';

interface AddToCartModalModalStore {
  isOpen: boolean;
  product: Product | null;
  onOpen: (product: Product) => void;
  onClose: () => void;
}

export const useAddToCartModal = create<AddToCartModalModalStore>((set) => ({
  isOpen: false,
  product: null,
  onOpen: (product: Product) => set({ isOpen: true, product }),
  onClose: () => set({ isOpen: false, product: null }),
}));
