import Button from './_component/button/Button';

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
    </div>
  );
}
