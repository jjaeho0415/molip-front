import React, { useEffect, useState } from 'react';
import styles from './addTaste.module.css';
import Button from '../buttons/Button';
import { categories } from '@/data/Categories';
import Loading from '../Loading';
import { UseQueryResult, useMutation } from '@tanstack/react-query';
import { postRecommendMyMenu } from '@/api/postRecommendMyMenu';

type RefetchType = UseQueryResult['refetch'];

interface AddTaste_BSProps {
	menuId: number;
	onClick?: () => void;
	isEmptyModalOpen?: boolean;
	refetch?: RefetchType;
}

type ISelctedOptionsType = {
	tasteOptions: string[];
	carbOptions: string[];
	weatherOptions: string[];
	categoryOptions: string[];
};

export type IPostRecommend = {
	menuId: number;
	selectedOptions: ISelctedOptionsType;
};

function AddTaste_BS({
	menuId,
	onClick,
	isEmptyModalOpen,
	refetch,
}: AddTaste_BSProps) {
	const [isAllTasteClicked, setIsAllTasteClicked] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedOptions, setSelectedOptions] = useState<ISelctedOptionsType>({
		tasteOptions: [],
		carbOptions: [],
		weatherOptions: [],
		categoryOptions: [],
	});

	useEffect(() => {
		const allCategoriesSelected =
			selectedOptions.tasteOptions.length > 0 &&
			selectedOptions.carbOptions.length > 0 &&
			selectedOptions.weatherOptions.length > 0 &&
			selectedOptions.categoryOptions.length > 0;

		setIsAllTasteClicked(allCategoriesSelected);
	}, [selectedOptions]);

	const { mutate: postRecommend } = useMutation({
		mutationFn: ({ menuId, selectedOptions }: IPostRecommend) =>
			postRecommendMyMenu({ menuId, selectedOptions }),
		onSuccess: () => {
			setIsLoading(false);
			alert('필터 적용이 완료되었습니다.');
			refetch && refetch();
		},
	});

	const handleSave = (): void => {
		if (isAllTasteClicked) {
			if (isEmptyModalOpen) {
				onClick?.();
				return;
			}
			setIsLoading(true);
			const transformedOptions = transformOptions(selectedOptions);
			postRecommend({ menuId, selectedOptions: transformedOptions });
		}
	};

	const transformOptions = (
		options: ISelctedOptionsType,
	): ISelctedOptionsType => {
		const transformed: ISelctedOptionsType = { ...options };
		for (const category in transformed) {
			transformed[category as keyof ISelctedOptionsType] = transformed[
				category as keyof ISelctedOptionsType
			].map((option) => (option === 'ALL(상관없음)' ? 'ALL' : option));
		}
		return transformed;
	};

	const handleOptionClick = (
		categoryName: keyof ISelctedOptionsType,
		option: string,
	) => {
		setSelectedOptions((prevSelected) => {
			const currentCategoryOptions = prevSelected[categoryName] || [];
			const isAll = option === 'ALL(상관없음)';
			const isSelected = currentCategoryOptions.includes(option);
			if (isAll) {
				return {
					...prevSelected,
					[categoryName]: isSelected ? [] : [option],
				};
			}

			if (isSelected) {
				return {
					...prevSelected,
					[categoryName]: currentCategoryOptions.filter(
						(item) => item !== option,
					),
				};
			} else {
				const newSelection = isAll
					? [option]
					: [...currentCategoryOptions, option];
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
			tasteOptions: [],
			carbOptions: [],
			weatherOptions: [],
			categoryOptions: [],
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
										(
											selectedOptions[
												category.name as keyof ISelctedOptionsType
											] || []
										).includes(option)
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
