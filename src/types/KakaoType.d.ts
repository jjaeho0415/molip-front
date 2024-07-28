interface KakaoShareSettings {
	objectType: 'feed';
	content: {
		title: string;
		description: string;
		imageUrl: string;
		link: {
			mobileWebUrl: string;
			webUrl: string;
		};
	};
	buttons?: {
		title: string;
		link: {
			mobileWebUrl: string;
			webUrl: string;
		};
	}[];
}

declare global {
	interface Window {
		Kakao: {
			init: (apiKey: string) => void;
			isInitialized: () => boolean;
			Share: {
				sendDefault: (settings: KakaoShareSettings) => void;
			};
		};
	}
}

export {};
