import { create } from 'zustand';
import { UserStore } from '../interfaces/UserInterfaces';

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

export default useUserStore;