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
						<p>다양한 옵션으로</p>
						<p>맞춤 입맛 설정</p>
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
