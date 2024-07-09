'use client';

import Header from '@/components/Header';
import styles from './home.module.css';
import TabNavigation from '@/components/TabNavigation';
import { useState } from 'react';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Button from '@/components/buttons/Button';
import MyMenuList from './_components/MyMenuList';
import TeamMenuList from './_components/TeamMenuList';
import { myMenuList, teamMenuList } from '@/data/menuList';
import MenuEmpty from './_components/MenuEmpty';
import Image from 'next/image';
import InformationModal from './_components/InformationModal';

export default function Home() {
	const [tab, setTab] = useState<'my' | 'team'>('my');
	const [isInformOpen, setIsInformOpen] = useState<boolean>(false);

	const handleInformClick = (): void => {
		if (isInformOpen) {
			setIsInformOpen(false);
			return;
		}
		setIsInformOpen(true);
	};

	return (
		<>
			<Header />
			<TabNavigation tab={tab} setTab={setTab} />
			<div className={styles.createContainer}>
				<p className={styles.titleSection}>
					{tab === 'my' ? (
						'나의 메뉴판'
					) : (
						<>
							팀 메뉴판
							<Image
								alt='informationIcon'
								width={32}
								height={32}
								src='/svg/informationIcon.svg'
								style={{ cursor: 'pointer' }}
								onClick={handleInformClick}
							/>
							{isInformOpen && (
								<div
									style={{
										position: 'absolute',
										transform: 'translate(49.5px, 97px)',
									}}
								>
									<InformationModal />
								</div>
							)}
						</>
					)}
				</p>
				<Button state='new'>+ 새로만들기</Button>
			</div>

			<div className={styles.Container}>
				{tab === 'my' ? (
					myMenuList.length === 0 ? (
						<MenuEmpty
							tab='my'
							myMenuIsEmpty={myMenuList.length === 0 ? true : false}
						/>
					) : (
						<MyMenuList menuList={myMenuList} />
					)
				) : teamMenuList.length === 0 ? (
					<MenuEmpty
						tab='team'
						myMenuIsEmpty={myMenuList.length === 0 ? true : false}
					/>
				) : (
					<TeamMenuList menuList={teamMenuList} />
				)}
			</div>
			<BottomSheet size='small'>
				<span>Content</span>
			</BottomSheet>
		</>
	);
}
