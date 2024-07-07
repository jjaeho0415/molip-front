import Button from './components/buttons/Button';
import ShareButton from './components/buttons/ShareButton';

export default function Home() {
  return (
    <div>
      <Button>적용하기</Button>
      <br />
      <br />
      <Button state='disabled'>적용하기</Button>
      <br />
      <br />
      <Button size='small'>적용하기</Button>
      <br />
      <ShareButton></ShareButton>

      <ShareButton state='disabled'></ShareButton>
    </div>
  );
}
