import { useRouter } from 'next/navigation';
import Button from '../buttons/Button';
import styles from './noMenu.module.css';
import useHomeStore from '@/app/home/store/useHomeStore';

interface INoMenuProps {
	teamBoardId: number;
}

export default function NoMenu_BS({ teamBoardId }: INoMenuProps) {
	const router = useRouter();
	const { setTab } = useHomeStore();
	return (
		<div className={styles.Container}>
			<div className={styles.TitleBox}>
				<p>당신의 입맛을 반영해 줄</p>
				<p>나의 메뉴판이 없습니다.</p>
			</div>
			<div className={styles.SubBox}>
				<p>'투표만 하기'클릭 시</p>
				<p> 메뉴 추가 없이 투표 기능만 제공됩니다.</p>
			</div>
			<div className={styles.BtnBox}>
				<Button
					size='small'
					onClick={() => {
						setTab('my');
						router.push(`/home`);
					}}
				>
					나의 메뉴판 만들기
				</Button>
				<Button
					size='small'
					onClick={() => router.push(`/vote?teamBoardId=${teamBoardId}`)}
				>
					투표만 하기
				</Button>
			</div>
		</div>
	);
}
