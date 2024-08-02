export const constant = {
	kakaoKey: process.env.NEXT_PUBLIC_KAKAOKEY as string,
	token: process.env.NEXT_PUBLIC_ACCESS as string,
	protectedRoute: [
		'/teamMenuPage',
		'/myPage',
		'/menu',
		'/makeTeam',
		'/kakaoMap',
		'/home',
		'/vote',
		'/createMyMenu',
	],
};
