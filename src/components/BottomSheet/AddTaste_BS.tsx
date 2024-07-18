import React, { useEffect, useState } from 'react';
import styles from './addTaste.module.css';
import Button from '../buttons/Button';
import { categories } from '@/data/Categories';
import Loading from '../Loading';

interface AddTaste_BSProps {
	onClick: () => void;
}

function AddTaste_BS({ onClick }: AddTaste_BSProps) {
	const [isAllTasteClicked, setIsAllTasteClicked] = useState<boolean>(false);
	const [selectedOptions, setSelectedOptions] = useState<ISelctedOptionsType>({
		todayCategory: [],
		tansuCategory: [],
		weatherCategory: [],
		countryCategory: [],
	});

	useEffect(() => {
		if (
			selectedOptions.countryCategory.length !== 0 &&
			selectedOptions.tansuCategory.length !== 0 &&
			selectedOptions.todayCategory.length !== 0 &&
			selectedOptions.weatherCategory.length !== 0
		) {
			setIsAllTasteClicked(true);
		} else {
			setIsAllTasteClicked(false);
		}
	}, [selectedOptions]);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSave = (): void => {
		if (isAllTasteClicked) {
			setIsLoading(true);
			setTimeout(() => {
				setIsLoading(false);
				onClick();
			}, 3000);
		}
	};

	const handleOptionClick = (
		categoryName: keyof ISelctedOptionsType,
		option: string,
	) => {
		setSelectedOptions((prevSelected) => {
			const isAll = option === 'ALL(상관없음)';
			const isSelected = prevSelected[categoryName].includes(option);

			if (isAll) {
				return {
					...prevSelected,
					[categoryName]: isSelected ? [] : [option],
				};
			}

			if (isSelected) {
				return {
					...prevSelected,
					[categoryName]: prevSelected[categoryName].filter(
						(item) => item !== option,
					),
				};
			} else {
				const newSelection = isAll
					? [option]
					: [...prevSelected[categoryName], option];
				return {
					...prevSelected,
					[categoryName]: newSelection.filter(
						(item) => item !== 'ALL(상관없음)',
					),
				};
			}
		});
	};

	const handleReset = () => {
		setSelectedOptions({
			todayCategory: [],
			tansuCategory: [],
			weatherCategory: [],
			countryCategory: [],
		});
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.textBox}>
					<p className={styles.headerText}>오늘의 입맛은 어떤가요?</p>
					<p className={styles.smallText}>
						당신의 입맛과 가장 비슷하게 선택해주세요.
					</p>
				</div>

				{categories.map((category) => (
					<div key={category.title} className={styles.category}>
						<p>
							{category.title}
							<span> (중복가능)</span>
						</p>
						<div className={styles.options}>
							{category.options.map((option) => (
								<div
									key={option}
									className={`${styles.optionButton} ${
										selectedOptions[
											category.name as keyof ISelctedOptionsType
										].includes(option)
											? styles.selected
											: ''
									}`}
									onClick={() =>
										handleOptionClick(
											category.name as keyof ISelctedOptionsType,
											option,
										)
									}
								>
									{option}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<div className={styles.buttonBox}>
				<p className={styles.reset} onClick={handleReset}>
					초기화
				</p>
				{isLoading ? (
					<Button>
						<Loading backgroundColor='orange' />
					</Button>
				) : (
					<Button
						state={!isAllTasteClicked ? 'disabled' : 'default'}
						onClick={handleSave}
					>
						적용하기
					</Button>
				)}
			</div>
		</>
	);
}

export default AddTaste_BS;
