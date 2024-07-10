import React, { ReactNode } from 'react';
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
  const { onDragEnd, controls } = useBottomSheet();

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
