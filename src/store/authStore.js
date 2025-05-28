import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      role: null,
      username: null,
      token: null,

      setAuth: ({ role, username, token }) => set({ role, username, token }),
      logout: () => set({ role: null, username: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);