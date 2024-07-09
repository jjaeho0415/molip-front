import React from 'react';
import styles from './styles/informationModal.module.css';

function InformationModal() {
	return (
		<>
			<div className={styles.modal}>
				<div className={styles.content}>
					<p>1. 팀을 만들고 팀원을 초대한다.</p>
					<p>
						2. 모든 팀원이 각자 메뉴를 <br /> 
						<span>추가하여 팀 메뉴판을 만든다.</span>
					</p>
					<p>3. 오늘 먹을 메뉴를 투표한다.</p>
				</div>
			</div>
		</>
	);
}

export default InformationModal;
