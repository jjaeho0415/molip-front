'use client';

import OptionButton from '@/components/buttons/OptionButton';
import styles from './voteResultCard.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';

interface IVoteResultProps {
	voteResult: IUserVotes;
	size?: 'small' | 'default';
}

export default function VoteResultCard({
	voteResult,
	size = 'default',
}: IVoteResultProps) {
	return (
		<div className={`${styles.Container} ${styles[size]}`}>
			<div className={styles.TopBox}>
				<p className={styles.TeamName}>{voteResult.teamName}</p>
				<p className={styles.Date}>{voteResult.voteDate}</p>
			</div>
			<Swiper
				spaceBetween={5}
				slidesPerView={'auto'}
				freeMode={true}
				modules={[FreeMode]}
				className={styles.BottomBox}
			>
				{voteResult &&
					(() => {
						// 가장 높은 투표 수를 찾기
						const maxVoteValue = Math.max(
							...voteResult.votes.map((item) => item.voteValue),
						);
						return voteResult.votes.map((item, idx) => (
							<SwiperSlide className={styles.Option} key={idx}>
								<OptionButton
									option={false}
									state={
										item.voteValue === maxVoteValue ? 'checked' : 'selected'
									}
								>
									{item.menuName}
								</OptionButton>
							</SwiperSlide>
						));
					})()}
			</Swiper>
		</div>
	);
}
