import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/menuEmpty.module.css';
import Image from 'next/image';

interface MenuEmptyProps {
	tab: 'my' | 'team';
	myMenuIsEmpty: boolean;
	setTab: Dispatch<SetStateAction<'my' | 'team'>>;
}

function MenuEmpty({ tab, myMenuIsEmpty, setTab }: MenuEmptyProps) {
	return (
		<>
			{tab === 'my' ? (
				<div className={styles.emptyContainer}>
					<div className={styles.textSection}>
						<p>오늘의 입맛은 어떤가요?</p>
						<p>당신만의 메뉴판을 생성해보세요.</p>
					</div>
					<div className={styles.createButton}>+ 새로만들기</div>
				</div>
			) : (
				<>
					<div className={styles.emptyContainer}>
						<div className={styles.textSection}>
							<p>오늘도 다같이 메뉴를 고민하나요?</p>
							<p>우리 팀 전용 메뉴판을 만들어보세요.</p>
						</div>
					</div>
					{myMenuIsEmpty && (
						<div
							className={styles.bottomTextSection}
							onClick={() => setTab('my')}
						>
							<p className={styles.topBottomText}>
								팀 메뉴판을 생성하려면 나의 메뉴판이 필요합니다.
							</p>
							<p className={styles.secondBottomText}>
								아직 '나의 메뉴판'이 없다면?
								<Image
									alt='rightArrow'
									width={20}
									height={20}
									src='/svg/rightArrow.svg'
								/>
							</p>
						</div>
					)}
				</>
			)}
		</>
	);
}

export default MenuEmpty;
