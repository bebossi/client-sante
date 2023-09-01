import { create } from "zustand";

interface AddToCartModalModalStore {
  isOpen: boolean;
  toggleOpen: () => void;
}

const useRestaurantIsOpen = create<AddToCartModalModalStore>((set) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useRestaurantIsOpen;
