'use client';

import Header from '@/components/Header';
import useFunnel from '@/hooks/useFunnel';
import Voting from './components/voting';
import VoteDone from './components/voteDone';
import VoteResult from './components/voteResult';
import TabNavigation from '@/components/TabNavigation';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getVoteResult } from '@/api/getVoteResult';

const steps: string[] = ['투표중', '투표완료', '투표결과'];

export default function Vote() {
	const { data: voteList } = useQuery<IGetVoteList>({
		queryKey: ['VOTE_LIST'],
		queryFn: () => getVoteResult(menuId),
	});

	const [Funnel, Step, setStep] = useFunnel(
		voteList?.isVote ? steps[1] : steps[0],
	);
	const searchParams = useSearchParams();
	const menuId = Number(searchParams.get('menuId'));
	const menuName = searchParams.get('menuName');

	return (
		<>
			<Header />
			<TabNavigation />
			<Funnel>
				<Step name='투표중'>
					<Voting
						onNext={() => setStep('투표완료')}
						menuId={menuId}
						menuName={menuName ?? ''}
						isVoted={voteList?.isVote}
					/>
				</Step>
				<Step name='투표완료'>
					<VoteDone
						onNext={() => setStep('투표결과')}
						onBefore={() => setStep('투표중')}
						menuId={menuId}
						menuName={menuName ?? ''}
					/>
				</Step>
				<Step name='투표결과'>
					<VoteResult
						voteResult={voteList}
						menuId={menuId}
						menuName={menuName ?? ''}
					/>
				</Step>
			</Funnel>
		</>
	);
}
