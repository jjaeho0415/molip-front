import { Suspense } from 'react';
import './styles/globals.css';
import RQProvider from '@/components/RQProvider';
import { constant } from '@/utils/constant';
import Script from 'next/script';
import Head from 'next/head';

export const metadata: MetaDataType = {
	title: '모두의 입맛 - molip',
	description: '직장인 메뉴 선정 서비스',
	icons: {
		icon: '/logo/Logo_noBg_orange.svg',
	},
	openGraph: {
		title: '모두의 입맛 - molip',
		description: '직장인 메뉴 선정 서비스',
		images: [
			{
				url: '/image/openGraphImg.png',
				width: 800,
				height: 400,
			},
		],

		siteName: '모두의 입맛 - molip',
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
			<Head>
				<title>{metadata.title}</title>
				<meta name='description' content={metadata.description} />
				<link rel='icon' href={metadata.icons.icon} sizes='any' />
				<meta property='og:title' content={metadata.openGraph.title} />
				<meta
					property='og:description'
					content={metadata.openGraph.description}
				/>
				<meta property='og:image' content={metadata.openGraph.images[0].url} />
				<meta
					property='og:image:width'
					content={`${metadata.openGraph.images[0].width}`}
				/>
				<meta
					property='og:image:height'
					content={`${metadata.openGraph.images[0].height}`}
				/>
				<meta property='og:site_name' content={metadata.openGraph.siteName} />
				<meta property='og:type' content={metadata.openGraph.type} />
				{/* <link
					rel='apple-touch-icon'
					href=''
				/>
				<link
					rel='shortcut icon'
					href=''
				/> */}
			</Head>
			<body>
				<RQProvider>
					<Suspense>
						<div className='root_container'>{children}</div>
						<Script src={API} strategy='afterInteractive' />
						<Script src='https://developers.kakao.com/sdk/js/kakao.js' />
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
