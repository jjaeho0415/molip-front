import { create } from 'zustand';

interface VoteItem {
	menuName: string;
	menuId: number;
}

interface VoteStore {
	voteArr: VoteItem[];
	setVoteArr: (voteArr: VoteItem[]) => void;
}

const useVoteStore = create<VoteStore>((set) => ({
	voteArr: [],
	setVoteArr: (voteArr: VoteItem[]) => set(() => ({ voteArr })),
}));

export default useVoteStore;
