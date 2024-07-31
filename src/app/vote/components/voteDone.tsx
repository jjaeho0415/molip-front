'use client';

import styles from './voteComponents.module.css';
import Button from '@/components/buttons/Button';
import TopNavBar from '@/components/TopNavBar';
import Image from 'next/image';
import Icon from '../../../../public/icons/checkOrange.svg';
import OptionButton from '@/components/buttons/OptionButton';
import useVoteStore from '../store/useVoteStore';
import { useQuery } from '@tanstack/react-query';
import { getVoteMembers } from '@/api/getVoteMembers';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useEffect, useState } from 'react';

interface IVoteDoneProps {
	onNext: () => void;
	onBefore: () => void;
	menuId: number;
	menuName: string;
}

export default function VoteDone({
	onNext,
	menuId,
	menuName,
	onBefore,
}: IVoteDoneProps) {
	const { voteArr } = useVoteStore();
	const { isLogin } = useAuthStore();
	const [isAllVoted, setIsAllVoted] = useState<boolean>(false);

	const { data: votedMembers } = useQuery<IGetVoteMembers>({
		queryKey: ['VOTED_USER_COUNT'],
		queryFn: () => getVoteMembers(menuId),
		enabled: isLogin,
	});

	useEffect(() => {
		if (votedMembers?.teamMembersNum === votedMembers?.votedUserCount) {
			setIsAllVoted(true);
		} else {
			setIsAllVoted(false);
		}
	}, [votedMembers]);

	return (
		<>
			<TopNavBar backRoute={`/menu?menuId=${menuId}&menuName=${menuName}`} />
			<div className={styles.DoneContentsContainer}>
				<div className={styles.DoneContent}>
					<Image src={Icon} width={48} height={48} alt='check' />
					<p className={styles.DoneP}>투표를 완료했습니다.</p>
					<div className={styles.DoneOptionBox}>
						{voteArr.map((item, idx) => (
							<div key={idx}>
								<OptionButton state='selected' option={false}>
									{item.menuName}
								</OptionButton>
							</div>
						))}
					</div>
				</div>
				{!isAllVoted && (
					<p className={styles.DoneVotingComment}>
						다른 팀원이 투표 중입니다.{' '}
						{`(${votedMembers?.votedUserCount} /
						${votedMembers?.teamMembersNum})`}
					</p>
				)}
			</div>
			<div className={styles.DoubleButtonBox}>
				<Button size='big' onClick={onBefore}>
					다시 선택하기
				</Button>

				<Button
					size='big'
					state={isAllVoted ? 'default' : 'disabled'}
					onClick={onNext}
				>
					결과 보기
				</Button>
			</div>
		</>
	);
}
