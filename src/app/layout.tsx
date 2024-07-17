// import type { Metadata } from 'next';
import { Suspense } from 'react';
import './styles/globals.css';
import RQProvider from '@/components/RQProvider';
import Loading from '@/components/Loading';
import { constant } from '@/utils/constant';
import Script from 'next/script';

// export const metadata: Metadata = {
//   title: '',
//   description: '',
//   icons: {
//     icon: '',
//   },
//   openGraph: {
//     title: '',
//     description: '',
//     images: [
//       {
//         url: 'https://raw.githubusercontent.com/SWYP-LUCKY-SEVEN/front-end/develop/public/Icon_Logo.png',
//         width: 1900,
//         height: 600,
//       },
//     ],

//     siteName: '모두의 입맛 - molip',
//     type: 'website',
//   },
// };

export const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${constant.kakaoKey}&libraries=services,clusterer&autoload=false`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko'>
			<body>
				<RQProvider>
					<Suspense fallback={<Loading backgroundColor='white' />}>
						<div className='root_container'>{children}</div>
						<Script src={API} strategy='beforeInteractive' />
					</Suspense>
				</RQProvider>
				<div id='portal' />
			</body>
		</html>
	);
}
