'use client';

import Header from '@/components/Header';
import styles from './vote.module.css';
import useFunnel from '@/hooks/useFunnel';
import Voting from './components/voting';
import VoteDone from './components/voteDone';
import VoteResult from './components/voteResult';

const steps: string[] = ['투표중', '투표완료', '투표결과'];

export default function Vote() {
	const [Funnel, Step, setStep] = useFunnel(steps[0]);

	return (
		<>
			<Header />
			<div className={styles.ContentsContainer}>
				<Funnel>
					<Step name='투표중'>
						<Voting onNext={() => setStep('투표완료')} />
					</Step>
					<Step name='투표완료'>
						<VoteDone onNext={() => setStep('투표결과')} />
					</Step>
					<Step name='투표결과'>
						<VoteResult />
					</Step>
				</Funnel>
			</div>
		</>
	);
}
