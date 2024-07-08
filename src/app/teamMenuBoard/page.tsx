import Header from '@/components/Header';
import styles from './teamMenuBoard.module.css';
import TabNavigation from '@/components/TabNavigation';

export default function TeamMenuBoard() {
  return (
    <>
      <Header />
      <TabNavigation tab='team' />
      <div className={styles.Container}></div>
    </>
  );
}
