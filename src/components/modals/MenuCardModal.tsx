'use client';

import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/menuCardModal.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper/modules';
import ModalButton from '../buttons/ModalButton';

interface MenuCardModalProps {
	menuTitle: string;
	hashTags: string[];
	menuImage: string;
	setIsMenuCardModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MenuCardModal({
	menuTitle,
	hashTags,
	menuImage,
	setIsMenuCardModalOpen,
}: MenuCardModalProps) {
	const closeModal = () => {
		setIsMenuCardModalOpen(false);
	};

	return (
		<>
			<div
				className={styles.overlay}
				onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					if (event.target === event.currentTarget) {
						setIsMenuCardModalOpen(false);
					}
				}}
			>
				<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
					<div className={styles.contentSection}>
						<Image
							className={styles.image}
							alt='menuImage'
							src={menuImage}
							height={240}
							width={240}
						/>
						<p className={styles.title}>{menuTitle}</p>
						<div className={styles.hashTagSwiper}>
							<Swiper
								spaceBetween={5}
								slidesPerView={'auto'}
								freeMode={true}
								modules={[FreeMode]}
							>
								{hashTags.map((tag, index) => (
									<SwiperSlide key={index} className={styles.hashTagList}>
										<div className={styles.hashtag}>#{tag}</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>

					<div className={styles.modalButtonSection}>
						<ModalButton
							handleClick={closeModal}
							buttonText='닫기'
							color='gray'
						/>
					</div>
				</div>
			</div>
		</>
	);
}
