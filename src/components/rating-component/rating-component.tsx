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
}

export const RatingComponent = ({
  rate,
  precision = 0.1,
  interactive = false,
  showValue = false,
  handleChange,
  size = 'medium',
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
      />
    );
  }

  return (
    <StyledRatingWrapper>
      <StyledRating
        emptyIcon={<IconStar color="inherit" />}
        icon={<IconStar color="inherit" />}
        getLabelText={value => `Оценка ${value} из 5`}
        value={rate}
        precision={precision}
        size={size}
        readOnly
      />
      {showValue ? (
        <span className="rating-number">{rate.toFixed(1)}</span>
      ) : null}
    </StyledRatingWrapper>
  );
};
