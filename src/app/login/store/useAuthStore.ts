import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginState {
	isLogin: boolean;
	accessToken: string;
	setLoginState: (isLogin: boolean, accessToken: string) => void;
	clearLoginState: () => void;
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
			clearLoginState: () => set({ isLogin: false, accessToken: '' }),
		}),
		{ name: 'login-storage' },
	) as (set: (fn: (state: LoginState) => LoginState) => void) => LoginState,
);
