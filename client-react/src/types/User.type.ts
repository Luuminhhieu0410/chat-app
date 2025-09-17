export interface User {
  id: number | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  password: string
}

export interface UserState extends User{
  access_token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

export interface LoginApiRespone {
    access_token: string,
    data: User
}