'use client';

import Header from '@/components/Header';
import useFunnel from '@/hooks/useFunnel';
import Voting from './components/voting';
import VoteDone from './components/voteDone';
import VoteResult from './components/voteResult';
import TabNavigation from '@/components/TabNavigation';

const steps: string[] = ['투표중', '투표완료', '투표결과'];

export default function Vote() {
	const [Funnel, Step, setStep] = useFunnel(steps[0]);

	return (
		<>
			<Header />
			<TabNavigation />
			<Funnel>
				<Step name='투표중'>
					<Voting onNext={() => setStep('투표완료')} />
				</Step>
				<Step name='투표완료'>
					<VoteDone
						onBefore={() => setStep('투표중')}
						onNext={() => setStep('투표결과')}
					/>
				</Step>
				<Step name='투표결과'>
					<VoteResult onBefore={() => setStep('투표중')} />
				</Step>
			</Funnel>
		</>
	);
}
