import React, { ReactNode, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import useBottomSheet from '../../hooks/useBottomSheet';
import styles from './bottomSheet.module.css';
import BTMHeader from './BTMHeader';

interface BottomSheetProps {
	size?: 'default' | 'small';
	children: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
	size = 'default',
	children,
}) => {
	const { onDragEnd, controls, isOpen } = useBottomSheet();

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

	return (
		<motion.div
			className={`${styles.wrapper} ${styles[size]}`}
			drag='y'
			onDragEnd={(
				event: MouseEvent | TouchEvent | PointerEvent,
				info: PanInfo,
			) => onDragEnd(info)}
			initial='hidden'
			animate={controls}
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
	);
};

export default BottomSheet;
