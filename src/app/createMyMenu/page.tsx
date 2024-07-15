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

function CreateMyMenu() {
	const [value, setValue] = useState<string>('');
	const [isEmpty, setIsEmpty] = useState<boolean>(false);
	const { setIsOpen } = useBottomSheet();

	useEffect(() => {
		if (value) {
			setIsEmpty(false);
			return;
		}
		setIsEmpty(true);
	}, [value]);

	const handleClickButton = () => {
		setIsOpen(false);
		alert('필터 적용이 완료되었습니다.');
	};

	return (
		<div className={styles.Container}>
			<Header />
			<TabNavigation />
			<TopNavBar title='' backRoute='/home' />
			<div className={styles.ContentsContainer}>
				<div className={styles.inputBox}>
					<SmallInput
						placeholder='OOO의 메뉴판'
						value={value}
						setValue={setValue}
					/>
					{isEmpty && (
						<div style={{ position: 'absolute', top: '70px', left: '20px' }}>
							<IsEmptyModal setIsEmpty={setIsEmpty} />
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

export default CreateMyMenu;
