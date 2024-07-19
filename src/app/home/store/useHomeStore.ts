import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface HomeStore {
	tab: 'my' | 'team' | 'map';
	setTab: (tab: 'my' | 'team' | 'map') => void;
}

const useHomeStore = create<HomeStore>(
	persist(
		(set) => ({
			tab: 'team',
			setTab: (selected: 'my' | 'team' | 'map') => set({ tab: selected }),
		}),
		{
			name: 'home-store',
			storage: createJSONStorage(() => sessionStorage), // 세션 스토리지를 사용하도록 설정
		},
	) as (set: (fn: (state: HomeStore) => HomeStore) => void) => HomeStore,
);

export default useHomeStore;
