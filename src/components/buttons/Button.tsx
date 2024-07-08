'use client';

import styles from './styles/button.module.css';

interface IButtonProps {
  state?: 'default' | 'disabled' | 'test' | 'new';
  size?: 'small' | 'big';
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  state = 'default',
  size = 'big',
  onClick,
  children,
}: IButtonProps) {
  return (
    <button
      className={`${styles.DefaultButton} ${styles[size]} ${styles[state]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
