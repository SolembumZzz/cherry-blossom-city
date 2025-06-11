import { create } from "zustand";
import { DrawerStore } from "../interfaces/DrawerInterfaces";

const useDrawerStore = create<DrawerStore>((set) => ({
    isOpen: false,
    toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
    closeDrawer: () => set({ isOpen: false }),
    openDrawer: () => set({ isOpen: true }),
}));

export default useDrawerStore;