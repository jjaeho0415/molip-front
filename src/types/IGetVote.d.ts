type IGetVoteList = {
	teamName: string;
	voteDate: string;
	votes: IGetVote[];
	isVote: boolean;
};

type IGetVote = {
	voteValue: number;
	menuId: number;
	menuName: string;
};

type IGetVoteMembers = {
	votedUserCount: number;
	teamMembersNum: number;
};
