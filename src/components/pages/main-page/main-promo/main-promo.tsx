import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { DOCTORS_PAGE, Subtitle, Title } from '@/shared/assets';
import { ContainerComponent, SmartSearchInput } from '@/components';
import { Becas } from '@/components/icons';
import { useAppSelector } from '@/stores';
import { IPromoBlockData } from '@/shared/types';
import { StyledPromoSection } from './components';

interface Props {
  promoData: IPromoBlockData;
}

export const MainPromo = ({ promoData }: Props): JSX.Element => {
  const { searchStr } = useAppSelector(state => state.smartSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (): void => {
    router.push({
      pathname: DOCTORS_PAGE,
      query: {
        name: searchStr,
      },
    });
  };

  const renderIcon = (): JSX.Element => <Becas className="becas" />;

  return (
    <StyledPromoSection component="section" className="main-promo">
      <ContainerComponent>
        <div className="promo-info">
          <Title
            className="title title--main"
            variant="h2"
            dangerouslySetInnerHTML={{ __html: promoData.title }}
          />
          <Subtitle className="subtitle" variant="body1">
            {promoData.subtitle}
          </Subtitle>
        </div>
        <SmartSearchInput
          placeholder="Введите врача, специальность или клинику"
          mobilePlaceholder="Врач, специальнось, клиника"
          imageRenderer={renderIcon}
          ref={inputRef}
          handleSubmitCb={handleSubmit}
          location="home"
        />
      </ContainerComponent>
    </StyledPromoSection>
  );
};
