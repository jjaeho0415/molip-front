'use client';

import Header from '@/components/Header';
import Kakao_Map from './components/Kakao_Map';
import TabNavigation from '@/components/TabNavigation';
import styles from './kakaoMap.module.css';
import Image from 'next/image';
import Icon_option from '../../../public/icons/buttons/option.svg';
import Icon_search from '../../../public/icons/Icon_search.svg';
import { useState } from 'react';
import Loading from '@/components/Loading';

export default function KakaoMap() {
	const [keyword, setKeyword] = useState<string>('');
	const [searchKeyword, setSearchKeyword] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			e.key === 'Enter' &&
			keyword.trim() !== '' &&
			!e.nativeEvent.isComposing
		) {
			e.preventDefault();
			setSearchKeyword(keyword);
		}
	};

	const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};

	const handleClickSearch = () => {
		if (keyword.trim() !== '') {
			setSearchKeyword(keyword);
		}
	};

	const handleMapLoad = () => {
		setIsLoading(false);
	};

	return (
		<>
			<Header />
			<TabNavigation />
			<div className={styles.topContainer}>
				<div className={styles.inputContainer}>
					<input
						className={styles.input}
						placeholder='메뉴 혹은 맛집을 입력하세요.'
						onKeyDown={handleSearch}
						onChange={handleKeywordChange}
					/>
					<Image
						className={styles.searchIcon}
						src={Icon_search}
						width={24}
						height={24}
						alt='search'
						onClick={handleClickSearch}
					/>
				</div>
				<div className={styles.optionBox}>
					<Image src={Icon_option} width={24} height={24} alt='option' />
				</div>
			</div>
			{isLoading ? (
				<div className={styles.loading}>
					<Loading backgroundColor='white' />
				</div>
			) : (
				<Kakao_Map keyword={searchKeyword} onLoad={handleMapLoad} />
			)}
		</>
	);
}
