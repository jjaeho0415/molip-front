type IGetTeamMenuType = {
	teamBoardId: number;
	teamBoardName: string;
	teamMembersNum: number;
	teamName: string;
	userId: number;
	userName: string;
	userEmail: string;
	createdDate: string;
	modifiedData: string;
	hasUserAddedMenu: boolean;
};

type IGetAddedUserInfo = {
	addedMenuUserCount: number;
	teamMembersNum: number;
};
