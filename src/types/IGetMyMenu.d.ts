type IGetMyMenuType = {
	personalBoardId: number;
	name: string;
	userName: string;
	userEmail: string;
	createdDate: string;
	modifiedDate: string;
};

type IGetUserNameType = {
	username: string;
};

type IGetMyCategoryMenuType = {
	category: string;
	menu: IMenuItemType[]
}

type IMenuItemType = {
	menuId: number;
	imageUrl: string;
	menuName: string;
	tags: string[];
}