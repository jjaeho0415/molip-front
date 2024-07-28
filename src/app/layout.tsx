import { Suspense } from 'react';
import './styles/globals.css';
import RQProvider from '@/components/RQProvider';
import { constant } from '@/utils/constant';
import Script from 'next/script';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '모두의 입맛 - molip',
	description: '직장인 메뉴 선정 서비스',
	icons: {
		icon: '/logo/Logo_noBg_orange.svg',
	},
	openGraph: {
		title: '모입: 모두의 입맛을 충족해줄 메뉴판',
		// description: '직장인 메뉴 선정 서비스',
		images: [
			{
				url: '/image/openGraphImg.png',
				width: 800,
				height: 400,
			},
		],

		siteName: '모입: 모두의 입맛을 충족해줄 메뉴판',
		type: 'website',
	},
	metadataBase: new URL('https://molip.swygbro.com'),
};

const API: string = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${constant.kakaoKey}&libraries=services,clusterer&autoload=false`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko'>
			<body>
				<RQProvider>
					<Suspense>
						<div className='root_container'>{children}</div>
						<Script src={API} strategy='afterInteractive' />
						<Script
							src='https://developers.kakao.com/sdk/js/kakao.js'
							strategy='afterInteractive'
						/>
						<Script
							src='https://cdn.swygbro.com/public/widget/swyg-widget.js'
							strategy='afterInteractive'
						/>
					</Suspense>
				</RQProvider>
				<div id='portal' />
			</body>
		</html>
	);
}
