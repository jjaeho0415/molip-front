import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HomeStore {
	tab: 'my' | 'team';
	setTab: (tab: 'my' | 'team') => void;
}

const useHomeStore = create<HomeStore>(
	persist(
		(set) => ({
			tab: 'my',
			setTab: (selected: 'my' | 'team') => set({ tab: selected }),
		}),
		{
			name: 'home-store',
			getStorage: () => sessionStorage, // 세션 스토리지를 사용하도록 설정
		},
	) as (set: (fn: (state: HomeStore) => HomeStore) => void) => HomeStore,
);

export default useHomeStore;
