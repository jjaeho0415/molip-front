import AddMenu_BS from '@/components/BottomSheet/AddMenu_BS';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import styles from './voting.module.css';

interface IVoteDoneProps {
	onNext: () => void;
}

export default function VoteDone({ onNext }: IVoteDoneProps) {
	return (
		<>
			<div className={styles.DoneContentsContainer}></div>
		</>
	);
}
