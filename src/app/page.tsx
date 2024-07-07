import Button from '@/components/buttons/Button';
import MenuCardModal from '@/components/modals/MenuCardModal';
import ShareButton from './components/buttons/ShareButton';

export default function Home() {
  return (
    <>
      <div>
        <Button>적용하기</Button>
        <br />
        <br />
        <Button state='disabled'>적용하기</Button>
        <br />
        <br />
        <Button size='small'>적용하기</Button>
      </div>
      <div>
        <ShareButton></ShareButton>

        <ShareButton state='disabled'></ShareButton>
      </div>
      <div>
        <MenuCardModal
          menuTitle='감자탕'
          menuImage='../../public/image/감자탕.jpg'
          hashTags={['한식', '매콤함', '국물있는', '밥', '추운날']}
        />
      </div>
    </>
  );
}
