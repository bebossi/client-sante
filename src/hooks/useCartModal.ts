import { create } from 'zustand';
import { CartToProduct } from '../interfaces';

interface useCartModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  cartItems: CartToProduct[];
}

export const useCartModal = create<useCartModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  cartItems: [],
}));

// export default useCartModal;
