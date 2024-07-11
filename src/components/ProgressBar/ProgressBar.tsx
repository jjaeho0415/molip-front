import styles from './progressBar.module.css';

interface IProgressProps {
	members: number;
	voteValue: number;
	color: 'orange' | 'gray';
}

export default function ProgressBar({
	members,
	voteValue,
	color,
}: IProgressProps) {
	return (
		<div className={styles.Container}>
			<div
				className={styles[color]}
				style={{ width: `${(voteValue / members) * 100}%`, height: '8px' }}
			></div>
		</div>
	);
}
