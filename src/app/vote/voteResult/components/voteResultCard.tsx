'use client';

import OptionButton from '@/components/buttons/OptionButton';
import styles from './voteResultCard.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';

interface IVoteResultType {
	team: string;
	date: string;
	menu: string[];
}

interface IVoteResultProps {
	voteResult: IVoteResultType;
}

export default function VoteResultCard({ voteResult }: IVoteResultProps) {
	return (
		<div className={styles.Container}>
			<div className={styles.TopBox}>
				<p className={styles.TeamName}>{voteResult.team}</p>
				<p className={styles.Date}>{voteResult.date}</p>
			</div>
			<Swiper
				spaceBetween={5}
				slidesPerView={'auto'}
				freeMode={true}
				modules={[FreeMode]}
				className={styles.BottomBox}
			>
				{voteResult.menu.map((item: string, idx: number) => (
					<SwiperSlide className={styles.Option} key={idx}>
						<OptionButton
							option={false}
							state={idx === 0 ? 'checked' : 'selected'}
						>
							{item}
						</OptionButton>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
