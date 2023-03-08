import { useState, useEffect } from 'react';

export const useShowedCards = <T>(
  list: T[],
  expanded: boolean,
  defaultCardsCount: number,
): { showedCards: T[]; leftCards: number; hasHiddenCards: boolean } => {
  const [showedCards, setShowedCards] = useState<T[]>(list);
  const leftCards = list.length - defaultCardsCount;

  useEffect(() => {
    if (expanded) {
      setShowedCards(list);
    } else {
      setShowedCards(prev =>
        prev.filter((item, index) => index < defaultCardsCount),
      );
    }
  }, [expanded, list, defaultCardsCount]);

  return { showedCards, leftCards, hasHiddenCards: leftCards > 0 };
};
