import { UserState } from "@/types/User.type";
import { create } from "zustand";

export const useUserStore = create<UserState>((set) => ({
  id: null,
  name: null,
  email: null,
  avatar: null,
  password:null,
  token: null,
  isAuthenticated: false,
  loading: false,
  setUser: (user) =>
  set((state) => ({ ...state, ...user, isAuthenticated: true })),
  clearUser: () =>
    set({
      id: null,
      name: null,
      email: null,
      avatar: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    }),
}));
