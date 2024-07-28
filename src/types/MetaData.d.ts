type MetaDataType = {
	title: string;
	description: string;
	icons: {
		icon: string;
	};
	openGraph: {
		title: string;
		description: string;
		images: {
			url: string;
			width: number;
			height: number;
		}[];
		siteName: string;
		type: string;
	};
};
