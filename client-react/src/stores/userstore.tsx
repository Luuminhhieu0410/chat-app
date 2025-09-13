import { UserState } from "@/types/User.type";
import { create } from "zustand";

export const useUserStore = create<UserState>((set) => ({
  id: null,
  name: null,
  email: null,
  avatar: null,
  password: null,
  access_token: null,
  isAuthenticated: false,
  loading: false,
  setUser: (user) =>
    set((state) => {
      // console.log('---- data set user store' , JSON.stringify(user));
      return {
        ...state,
        ...user,
        isAuthenticated: true,
      };
    }),
  clearUser: () =>
    set({
      id: null,
      name: null,
      email: null,
      avatar: null,
      access_token: null,
      isAuthenticated: false,
      loading: false,
    }),
}));
