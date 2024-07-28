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
	// openGraph: {
	//   title: '',
	//   description: '',
	//   images: [
	//     {
	//       url: 'https://raw.githubusercontent.com/SWYP-LUCKY-SEVEN/front-end/develop/public/Icon_Logo.png',
	//       width: 1900,
	//       height: 600,
	//     },
	//   ],

	// siteName: '모두의 입맛 - molip',
	// type: 'website',
	// },
};

const API: string = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${constant.kakaoKey}&libraries=services,clusterer&autoload=false`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko'>
			<link rel='icon' href='/logo/Logo_noBg_orange.svg' sizes='any' />
			<body>
				<RQProvider>
					<Suspense>
						<div className='root_container'>{children}</div>
						<Script src={API} strategy='afterInteractive' />
						<script src='https://developers.kakao.com/sdk/js/kakao.js' />
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
