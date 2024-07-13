import React from 'react';
import styles from './createMyMenu.module.css';
import Header from '@/components/Header';
import TopNavBar from '@/components/TopNavBar';
import TabNavigation from '@/components/TabNavigation';

function CreateMyMenu() {
	return (
		<div className={styles.Container}>
			<Header />
			<TabNavigation />
			<TopNavBar title='' backRoute='/home' />
			<div className={styles.ContentsContainer}></div>
		</div>
	);
}

export default CreateMyMenu;
