import Header from '@/components/Header';
import styles from './myMenu.module.css';
import TabNavigation from '@/components/TabNavigation';

export default function MyMenu() {
  return (
    <>
      <Header />
      <TabNavigation tab='my' />
      <div className={styles.Container}></div>
    </>
  );
}
