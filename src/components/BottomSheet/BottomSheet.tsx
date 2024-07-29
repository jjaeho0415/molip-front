import React, { ReactNode, useEffect, useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import useBottomSheet from '../../hooks/useBottomSheet';
import styles from './bottomSheet.module.css';
import BTMHeader from './BTMHeader';
import Loading from '../Loading';

interface BottomSheetProps {
	size?: 'default' | 'small';
	children: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
	size = 'default',
	children,
}) => {
	const { onDragEnd, controls, isOpen, setControls } = useBottomSheet();
	const animationControls = useAnimation();
	const [isControlsReady, setIsControlsReady] = useState(false);

	useEffect(() => {
		setControls(animationControls);
	}, [animationControls, setControls]);

	useEffect(() => {
		if (controls) {
			setIsControlsReady(true);
		}
	}, [controls]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		// 컴포넌트 언마운트 시 body 스크롤 복원
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	useEffect(() => {
		if (isControlsReady && controls) {
			controls.start(isOpen ? 'visible' : 'hidden');
		}
	}, [isOpen, controls, isControlsReady]);

	useEffect(() => {
		console.log('BottomSheet isOpen:', isOpen);
	}, [isOpen]);

	return (
		<>
			{!isControlsReady ? (
				<div className={styles.loading}>
					<Loading backgroundColor='white' />
				</div> // 로딩바를 표시하는 부분
			) : (
				<motion.div
					className={`${styles.wrapper} ${styles[size]}`}
					drag='y'
					onDragEnd={(
						event: MouseEvent | TouchEvent | PointerEvent,
						info: PanInfo,
					) => onDragEnd(info)}
					initial='hidden'
					animate={controls || 'hidden'} // controls가 없을 때 'hidden'으로 설정
					transition={{
						type: 'spring',
						damping: 40,
						stiffness: 400,
					}}
					variants={{
						visible: { y: 0 },
						hidden: { y: '88%' },
					}}
					dragConstraints={{ top: 0 }}
					dragElastic={0.2}
				>
					<BTMHeader />
					<div className={styles.contentWrapper}>{children}</div>
				</motion.div>
			)}
		</>
	);
};

export default BottomSheet;
