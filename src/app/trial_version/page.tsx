'use client';

import AddTaste_BS from '@/components/BottomSheet/AddTaste_BS';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import RoundButton from '@/components/buttons/RoundButton';
import React, { useEffect, useState } from 'react';
import styles from './trialVersion.module.css';
import useBottomSheet from '@/hooks/useBottomSheet';
import TabNavigation from '@/components/TabNavigation';
import TopNavBar from '@/components/TopNavBar';
import SmallInput from '@/components/InputBox/SmallInput';
import IsEmptyModal from '../createMyMenu/_components/IsEmptyModal';
import Image from 'next/image';

function Trial_Version() {
	const [value, setValue] = useState<string>('나의메뉴판');

	const [isEmptyModalOpen, setIsEmptyModalOpen] = useState<boolean>(false);
	const { setIsOpen } = useBottomSheet();

	useEffect(() => {
		sessionStorage.setItem('guestMenuName', value);
		if (value) {
			setIsEmptyModalOpen(false);
			return;
		}
		setIsEmptyModalOpen(true);
	}, [value]);

	const handleClickButton = () => {
		if (isEmptyModalOpen) {
			alert('메뉴판 이름을 지어주세요!');
			return;
		}

		setIsOpen(false);
	};

	return (
		<div className={styles.Container}>
			<TopNavBar title='체험중' backRoute='/login' />
			<TabNavigation/>
			<div className={styles.ContentsContainer}>
				<div className={styles.inputBox}>
					<SmallInput
						placeholder='나의메뉴판'
						value={value}
						setValue={setValue}
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
					<AddTaste_BS onClick={handleClickButton} />
				</BottomSheet>
			</div>
		</div>
	);
}

export default Trial_Version;
