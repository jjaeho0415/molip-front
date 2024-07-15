'use client';

import Image from 'next/image';
import styles from './topNavBar.module.css';
import Icon_Back from '../../public/icons/Icon_back.svg';
import TopMenuButton from './buttons/TopMenuButton';
import MoreModal from './modals/MoreModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import NoticeModal from './modals/NoticeModal';

interface ITopNavBarProps {
	isLogin?: boolean;
	menu?: boolean;
	title?: string;
	pageType?:
		| 'insideTeamMenu'
		| 'outsideTeamMenu'
		| 'insideMyMenu'
		| 'outsideMyMenu';
	menuTitle?: string;
	teamTitle?: string;
	teamNumber?: number;
	backRoute?: string;
	active?: '메뉴판' | '메뉴이미지';
	setActive?: Dispatch<SetStateAction<'메뉴판' | '메뉴이미지'>>;
}

export default function TopNavBar({
	menu = false,
	isLogin = true,
	title,
	pageType = 'insideTeamMenu',
	menuTitle = '',
	teamTitle = '',
	teamNumber = -1,
	backRoute,
	active,
	setActive,
}: ITopNavBarProps) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isNoticeModalOpen, setIsNoticeModalOpen] = useState<boolean>(false);
	const route = useRouter();
	const handleGoBack = () => {
		if (title === '') {
			setIsNoticeModalOpen(true);
			return;
		}
		backRoute && route.push(backRoute);
	};
	return (
		<>
			<div className={styles.NavBarContainer}>
				{isLogin && (
					<Image
						className={styles.Icon_Back}
						src={Icon_Back}
						width={24}
						height={24}
						alt='backIcon'
						onClick={handleGoBack}
					/>
				)}

				{menu && active && setActive && (
					<TopMenuButton size='small' active={active} setActive={setActive} />
				)}
				{title && <p className={styles.Title}>{title}</p>}
				{menu && isLogin && (
					<Image
						className={styles.MoreBtn}
						alt='moreIcon'
						src='/svg/moreIcon.svg'
						width={24}
						height={24}
						onClick={() =>
							isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
						}
					/>
				)}
			</div>
			{menu && isModalOpen && (
				<div
					style={{
						position: 'absolute',
						right: '10px',
						transform: 'translateY(-10px)',
					}}
				>
					<MoreModal
						pageType={pageType}
						menuTitle={menuTitle}
						teamTitle={teamTitle}
						teamNumber={teamNumber}
					/>
				</div>
			)}
			{isNoticeModalOpen && (
				<NoticeModal titleText='' setIsNoticeModalOpen={setIsNoticeModalOpen} />
			)}
		</>
	);
}
