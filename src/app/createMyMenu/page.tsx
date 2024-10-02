'use client';

import React, { useEffect, useState } from 'react';
import styles from './createMyMenu.module.css';
import Header from '@/components/Header';
import TopNavBar from '@/components/TopNavBar';
import TabNavigation from '@/components/TabNavigation';
import SmallInput from '@/components/InputBox/SmallInput';
import Image from 'next/image';
import IsEmptyModal from './_components/IsEmptyModal';
import RoundButton from '@/components/buttons/RoundButton';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import useBottomSheet from '@/hooks/useBottomSheet';
import AddTaste_BS from '@/components/BottomSheet/AddTaste_BS';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '../login/store/useAuthStore';

function CreateMyMenu() {
	const [isEmptyModalOpen, setIsEmptyModalOpen] = useState<boolean>(false);
	const { setIsOpen } = useBottomSheet();
	const createMyMenu = useSearchParams();
	const defaultName = createMyMenu.get('menuName');
	const menuId = createMyMenu.get('menuId');
	const [value, setValue] = useState<string>('');

	const route = useRouter();
	const { isLogin } = useAuthStore.getState();

	useEffect(() => {
		!isLogin && route.push('/login');
	}, [isLogin]);

	useEffect(() => {
		if (value) {
			setIsEmptyModalOpen(false);
		} else {
			setIsEmptyModalOpen(true);
		}
	}, [value]);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	const handleBeforeUnload = () => {
		if (value === '') {
			setValue(defaultName || '');
		}
	};

	useEffect(() => {
		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [value, defaultName]);

	const handleClickButton = () => {
		if (value === '') {
			alert('메뉴판 이름을 지어주세요!');
		}
		setIsOpen(false);
	};

	return (
		<div className={styles.Container}>
			<Header />
			<TabNavigation />
			<TopNavBar title='' backRoute='/home' />
			<div className={styles.ContentsContainer}>
				<div className={styles.inputBox}>
					<SmallInput
						placeholder={`${defaultName}`}
						value={value}
						setValue={setValue}
						menuId={Number(menuId)}
					/>
					{isEmptyModalOpen && (
						<div style={{ position: 'absolute', top: '70px', left: '20px' }}>
							<IsEmptyModal setIsEmpty={setIsEmptyModalOpen} />
						</div>
					)}
					<Image
						src='/icons/Icon_pencil.svg'
						width={36}
						height={36}
						alt='edit'
					/>
				</div>
				<div className={styles.middleBox}>
					<p className={styles.comment}>아직 옵션을 선택하지 않았어요.</p>
					<RoundButton
						property='옵션'
						onClick={() => {
							setIsOpen(true);
						}}
					/>
				</div>
				<p className={styles.bottomComment}>위로 올려 옵션을 선택하세요.</p>
				<BottomSheet>
					<AddTaste_BS
						onClick={handleClickButton}
						menuId={Number(menuId)}
						inputValue={value}
					/>
				</BottomSheet>
			</div>
		</div>
	);
}

export default CreateMyMenu;
