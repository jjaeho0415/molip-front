'use client';

import AddTaste_BS from '@/components/BottomSheet/AddTaste_BS';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import RoundButton from '@/components/buttons/RoundButton';
import React, { useEffect, useState } from 'react';
import styles from './trialVersion.module.css';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useRouter, useSearchParams } from 'next/navigation';
import TabNavigation from '@/components/TabNavigation';
import TopNavBar from '@/components/TopNavBar';
import SmallInput from '@/components/InputBox/SmallInput';
import IsEmptyModal from '../createMyMenu/_components/IsEmptyModal';
import Image from 'next/image';

function Trial_Version() {
	const [value, setValue] = useState<string>('');
	const [isEmptyModalOpen, setIsEmptyModalOpen] = useState<boolean>(false);
	const { setIsOpen } = useBottomSheet();
	const route = useRouter();
	const createMyMenu = useSearchParams();
	const menuId = Number(createMyMenu.get('menuId'));

	useEffect(() => {
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
		alert('필터 적용이 완료되었습니다.');
		route.push('/menu');
	};

	return (
		<div className={styles.Container}>
			<TopNavBar title='체험중' backRoute='/login' />
			<TabNavigation isUser='guest' />
			<div className={styles.ContentsContainer}>
				<div className={styles.inputBox}>
					<SmallInput
						menuId={menuId}
						placeholder='OOO의 메뉴판'
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
					<AddTaste_BS
						onClick={handleClickButton}
						menuId={menuId}
					/>
				</BottomSheet>
			</div>
		</div>
	);
}

export default Trial_Version;
