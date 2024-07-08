import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginState {
  isLogin: boolean;
  accessToken: string;
  setLoginState: (isLogin: boolean, accessToken: string) => void;
}

export const useAuthStore = create<LoginState>(
  persist(
    (set) => ({
      isLogin: false,
      accessToken: '',
      setLoginState: (isLogin, accessToken) =>
        set({
          isLogin,
          accessToken,
        }),
    }),
    { name: 'login-storage' },
  ) as (set: (fn: (state: LoginState) => LoginState) => void) => LoginState,
);
