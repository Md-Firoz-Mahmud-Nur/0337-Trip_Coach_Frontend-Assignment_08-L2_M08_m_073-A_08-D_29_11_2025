/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  firstName: string;
  role: "TOURIST" | "GUIDE" | "ADMIN";
}

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (payload: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;
  logout: () => void;
};

// ✅ Cookie storage wrapper
const cookieStorage = createJSONStorage(() => ({
  getItem: (name: string) => {
    const cookie = Cookies.get(name);
    return cookie ? cookie : null;
  },
  setItem: (name: string, value: any) => {
    Cookies.set(name, JSON.stringify(value), { expires: 7, path: "/" });
  },
  removeItem: (name: string) => Cookies.remove(name),
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
      storage: cookieStorage,
    }
  )
);
