import Button from '../buttons/Button';
import styles from './noMenu.module.css';

export default function NoMenu_BS() {
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
        <Button size='small'>나의 메뉴판 만들기</Button>
        <Button size='small'>투표만 하기</Button>
      </div>
    </div>
  );
}
