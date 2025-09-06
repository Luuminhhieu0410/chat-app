export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  password: string
}

export interface UserState extends User{
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

export interface LoginApiRespone {
    access_token: string,
    data: User
}