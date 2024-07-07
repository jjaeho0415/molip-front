import Button from './components/buttons/Button';
import RoundButton from './components/buttons/RoundButton';
import ShareButton from './components/buttons/ShareButton';
import Splash from './components/Splash';

export default function Home() {
  return (
    <div>
      <Splash />
      <br />
      <Button size='small'>적용하기</Button>
      <br />
      <Button state='disabled'>적용하기</Button>
      <br />
      <br />
      <ShareButton></ShareButton>
      <br />
      <RoundButton property='새로' />
      <RoundButton property='메뉴' />
      <RoundButton property='메뉴추가완료' />
      <RoundButton property='옵션' />
    </div>
  );
}
