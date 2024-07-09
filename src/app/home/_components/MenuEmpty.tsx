import React from 'react';
import styles from './styles/menuEmpty.module.css';

interface MenuEmptyProps {
	tab: 'my' | 'team';
	myMenuIsEmpty?: boolean;
}

function MenuEmpty({ tab, myMenuIsEmpty }: MenuEmptyProps) {
    return (
        <>
            {tab === 'my' ? (
                <div className={styles.emptyContainer}>
                    <div className={styles.textSection}>
                        <p>오늘의 입맛은 어떤가요?</p>
                        <p >당신만의 메뉴판을 생성해보세요.</p>
                    </div>
                    <div className={styles.createButton}>+새로만들기</div>
                </div>
            ) : (<></>)}
        </>
    )
}

export default MenuEmpty;
