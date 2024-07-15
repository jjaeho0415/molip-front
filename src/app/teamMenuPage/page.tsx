'use client';

import Header from '@/components/Header';
import styles from './teamMenu.module.css';
import TabNavigation from '@/components/TabNavigation';
import TopNavBar from '@/components/TopNavBar';
import SmallInput from '@/components/InputBox/SmallInput';
import { useState } from 'react';
import Icon_pencile from '../../../public/icons/Icon_pencil.svg';
import Image from 'next/image';
import Icon_kakao from '../../../public/svg/Icon_kakao.svg';
import Icon_copy from '../../../public/svg/Icon_copyURL.svg';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import RoundButton from '@/components/buttons/RoundButton';
import NoMenu_BS from '@/components/BottomSheet/NoMenu_BS';
import AddMenu_BS from '@/components/BottomSheet/AddMenu_BS';
import useBottomSheet from '@/hooks/useBottomSheet';

export default function TeamMenuPage() {
	const { setIsOpen } = useBottomSheet();
	const [value, setValue] = useState<string>('스위프 10팀의 메뉴판');
	const [isDone] = useState<boolean>(true);
	const [hasMyMenu] = useState<boolean>(false);

	const handleClickButton = () => {
		setIsOpen(false);
		alert('필터 적용이 완료되었습니다.');
	};

	return (
		<>
			<Header />
			<TabNavigation />
			<TopNavBar backRoute='/home' />
			<div className={styles.contentsContainer}>
				<div className={styles.inputBox}>
					<SmallInput value={value} setValue={setValue}></SmallInput>
					<Image
						src={Icon_pencile}
						width={36}
						height={36}
						alt='edit'
					/>
				</div>
				<div className={styles.middleBox}>
					{isDone ? (
						<>
							<p className={styles.comment}>
								아직 팀원이 메뉴를 선택 중입니다.
							</p>
							<div className={styles.buttonBox}>
								<RoundButton
									property='메뉴추가완료'
									onClick={() => {
										return;
									}}
								/>
								<RoundButton
									property='새로고침'
									onClick={() => {
										return;
									}}
								/>
							</div>
						</>
					) : (
						<>
							<p className={styles.comment}>아직 메뉴를 추가하지 않았어요.</p>
							<RoundButton
								property='메뉴'
								onClick={() => {
									return;
								}}
							/>
						</>
					)}
				</div>

				<div className={styles.BottomBox}>
					<p className={styles.comment}>팀원 초대하기</p>

					<div className={styles.iconsBox}>
						<div className={styles.icon}>
							<Image src={Icon_kakao} width={50} height={50} alt='kakao' />
							<p className={styles.iconName}>카카오톡</p>
						</div>
						<div className={styles.iconBox}>
							<Image src={Icon_copy} width={50} height={50} alt='kakao' />
							<p className={styles.iconName}>링크복사</p>
						</div>
					</div>
				</div>
				<p className={styles.bottomComment}>위로 올려 옵션을 선택하세요.</p>

				{hasMyMenu ? (
					<BottomSheet size='small'>
						<NoMenu_BS />
					</BottomSheet>
				) : (
					<BottomSheet>
						<AddMenu_BS onClick={handleClickButton} />
					</BottomSheet>
				)}
			</div>
		</>
	);
}
