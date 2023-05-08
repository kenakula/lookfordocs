import { IconStar } from '@/components/icons';
import { RatingProps } from '@mui/material';
import { StyledRating, StyledRatingWrapper } from './components';

interface Props {
  rate: number;
  precision?: number;
  interactive?: boolean;
  handleChange?: (event: React.SyntheticEvent, value: number | null) => void;
  size?: RatingProps['size'];
  showValue?: boolean;
  className?: string;
}

export const RatingComponent = ({
  rate,
  precision = 0.1,
  interactive = false,
  showValue = false,
  handleChange,
  size = 'medium',
  className,
}: Props): JSX.Element => {
  if (interactive && handleChange) {
    return (
      <StyledRating
        emptyIcon={<IconStar color="inherit" />}
        icon={<IconStar color="inherit" />}
        getLabelText={value => `Оценка ${value} из 5`}
        value={rate}
        size={size}
        onChange={handleChange}
        className={className}
      />
    );
  }

  return (
    <StyledRatingWrapper
      itemProp="reviewRating"
      itemScope
      itemType="https://schema.org/Rating"
    >
      <meta itemProp="worstRating" content="1" />
      <meta itemProp="ratingValue" content={rate.toString()} />
      <meta itemProp="bestRating" content="5" />
      <StyledRating
        emptyIcon={<IconStar color="inherit" />}
        icon={<IconStar color="inherit" />}
        getLabelText={value => `Оценка ${value} из 5`}
        value={rate}
        precision={precision}
        size={size}
        readOnly
        className={className}
      />
      {showValue ? (
        <span className="rating-number">{rate.toFixed(1)}</span>
      ) : null}
    </StyledRatingWrapper>
  );
};
