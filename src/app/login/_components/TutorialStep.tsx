import React from 'react';
import styles from './tutorial.module.css';
import Image from 'next/image';

interface TutorialStepProps {
	step: number;
}

function TutorialStep({ step }: TutorialStepProps) {
	return (
		<>
			<div className={styles.TutorialContainer}>
				<div className={styles.topContainer}>
					{step === 1 ? (
						<>
							<Image
								width={40}
								height={40}
								alt='optionIcon'
								src='/svg/firstStepIcon.svg'
							/>
						</>
					) : step === 2 ? (
						<>
							<Image
								width={40}
								height={40}
								alt='downloadIcon'
								src='/svg/secondStepIcon.svg'
							/>
						</>
					) : step === 3 ? (
						<>
							<Image
								width={40}
								height={40}
								alt='checkIcon'
								src='/svg/thirdStepIcon.svg'
							/>
						</>
					) : (
						<>
							<Image
								width={40}
								height={40}
								alt='refreshIcon'
								src='/svg/fourthStepIcon.svg'
							/>
						</>
					)}
					<div>
						{step === 1 ? (
							<>
								<p>다양한 옵션으로</p>
								<p>맞춤 입맛 설정</p>
							</>
						) : step === 2 ? (
							<>
								<p>다양한 상황별</p>
								<p>맞춤 입맛 저장</p>
							</>
						) : step === 3 ? (
							<>
								<p style={{ whiteSpace: 'nowrap' }}>서로의 입맛을 맞출</p>
								<p>투표 기능</p>
							</>
						) : (
							<>
								<p>지난 결과 보기로</p>
								<p>놓쳤던 입맛 찾기</p>
							</>
						)}
					</div>
				</div>
				<div className={styles.imageContainer}>
					{step === 1 ? (
						<>
							<Image
								width={310}
								height={350}
								alt='firstStep'
								src='/svg/firstStep.svg'
							/>
						</>
					) : step === 2 ? (
						<>
							<Image
								width={310}
								height={350}
								alt='secondStep'
								src='/svg/secondStep.svg'
							/>
						</>
					) : step === 3 ? (
						<>
							<Image
								width={310}
								height={350}
								alt='thirdStep'
								src='/svg/thirdStep.svg'
							/>
						</>
					) : (
						<>
							<Image
								width={310}
								height={350}
								alt='fourthStep'
								src='/svg/fourthStep.svg'
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default TutorialStep;
