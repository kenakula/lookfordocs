import Link from 'next/link';
import { useAppSelector } from '@/stores';
import { Title } from '@/shared/assets';
import { IPromoBlockData } from '@/shared/types';
import { StyledContactsBlock } from './styled-components';

interface Props {
  promoData: IPromoBlockData;
}

export const ContactsBlock = ({ promoData }: Props): JSX.Element => {
  const { email, telegram } = useAppSelector(state => state.settings);

  return (
    <StyledContactsBlock className="contacts-block">
      <Title
        className="title"
        variant="h1"
        dangerouslySetInnerHTML={{ __html: promoData.title }}
      />

      <ul className="contacts-block-list">
        <li>
          <h2>Наша почта:</h2>
          <Link href={`mailto:${email}`}>{email}</Link>
        </li>
        <li>
          <h2>Наш Telegram:</h2>
          <Link href={telegram}>👀ForDocs</Link>
        </li>
      </ul>
    </StyledContactsBlock>
  );
};
