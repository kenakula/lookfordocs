import { useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ContainerComponent } from '@/components';
import { PageSection, Subtitle, Title } from '@/shared/assets';
import { IInsurance } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { CardsList, StyledInner } from './components';

const CARDS_COUNT_SHOW_MOBILE = 4;
const CARDS_COUNT_SHOW_DESKTOP = 8;

interface Props {
  insurances: IInsurance[];
}

export const MainInsurances = ({ insurances = [] }: Props): JSX.Element => {
  const blockRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [cardsNumber, setCardsNumber] = useState(CARDS_COUNT_SHOW_MOBILE);
  const isDesktop = useMediaQuery(Breakpoints.Desktop);

  useEffect(() => {
    setExpanded(false);

    if (isDesktop) {
      setCardsNumber(CARDS_COUNT_SHOW_DESKTOP);
    } else {
      setCardsNumber(CARDS_COUNT_SHOW_MOBILE);
    }
  }, [isDesktop]);

  const handleExpand = (): void => {
    if (!expanded && insurances) {
      setCardsNumber(insurances.length);
      setExpanded(true);
    } else {
      setCardsNumber(
        isDesktop ? CARDS_COUNT_SHOW_DESKTOP : CARDS_COUNT_SHOW_MOBILE,
      );
      setExpanded(false);
      if (blockRef.current) {
        blockRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  // TODO вынести тексты в цмс

  return (
    <PageSection bgColor="beje">
      <ContainerComponent>
        <StyledInner ref={blockRef}>
          <Title className="title" variant="h2" textAlign="center">
            Страховые компании
          </Title>
          <Subtitle className="subtitle" textAlign="center">
            Выберите свою страховую и узнайте какие врачи принимают по ней
          </Subtitle>
          <CardsList
            insurances={insurances}
            cardsNumber={cardsNumber}
            handleExpand={handleExpand}
            expanded={expanded}
          />
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
