import React, { useEffect, useState } from 'react';
import styles from './addTaste.module.css';
import Button from '../buttons/Button';
import { categories } from '@/data/Categories';
import Loading from '../Loading';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postRecommendMyMenu } from '@/api/postRecommendMyMenu';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { postGuestRecommend } from '@/api/postGuestRecommend';

interface AddTaste_BSProps {
	menuId?: number;
	onClick?: () => void;
	isEmptyModalOpen?: boolean;
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

function AddTaste_BS({ menuId, onClick, isEmptyModalOpen }: AddTaste_BSProps) {
	const [isAllTasteClicked, setIsAllTasteClicked] = useState<boolean>(false);
	const route = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedOptions, setSelectedOptions] = useState<ISelctedOptionsType>({
		tasteOptions: [],
		carbOptions: [],
		weatherOptions: [],
		categoryOptions: [],
	});
	const param = useSearchParams();
	const menuName = param.get('menuName');
	const queryClient = useQueryClient();
	let guestMenuName: string | null;
	if (typeof window !== undefined) {
		guestMenuName = sessionStorage.getItem('guestMenuName');
	}

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
			const current = window.location.href;
			alert('필터 적용이 완료되었습니다.');
			queryClient.invalidateQueries({ queryKey: ['MENU_LIST'] });
			if (current.includes('createMyMenu')) {
				route.push(`/menu?menuId=${menuId}&menuName=${menuName}`);
			}
		},
	});

	const { mutate: postGuestRecommended } = useMutation({
		mutationFn: (options: ISelctedOptionsType) => postGuestRecommend(options),
		onSuccess: (data: IGetMyCategoryMenuType[]) => {
			if (typeof window !== 'undefined') {
				sessionStorage.setItem('guest_menu', JSON.stringify(data));
			}
			setIsLoading(false);
			alert('필터 적용이 완료되었습니다.');
			if (!menuId) {
				route.push(`/menu?menuName=${guestMenuName}`);
			}
		},
	});

	const handleSave = (): void => {
		if (isAllTasteClicked) {
			if (isEmptyModalOpen) {
				onClick?.();
				return;
			}
			setIsLoading(true);
			const transformedOptions: ISelctedOptionsType =
				transformOptions(selectedOptions);
			if (menuId) {
				postRecommend({ menuId, selectedOptions: transformedOptions });
			} else {
				postGuestRecommended(transformedOptions);
			}
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
