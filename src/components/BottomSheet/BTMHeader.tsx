import React from 'react';
import styles from './bottomSheet.module.css';

const BTMHeader: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.handleBar} />
    </div>
  );
};

export default BTMHeader;
