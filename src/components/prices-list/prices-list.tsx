import { getPriceString, getTypography } from '@/shared/assets';
import { IPrice } from '@/shared/types';
import { styled } from '@mui/material';

export const StyledList = styled('dl')(({ theme }) => ({
  '.services-list-service': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),

    '&:last-child': {
      marginBottom: 0,
    },
  },

  dt: {
    ...getTypography(theme, 14, 20),
    marginRight: 'auto',
    paddingRight: theme.spacing(4),
  },

  dd: {
    ...getTypography(theme, 14, 20),
    fontWeight: 600,
  },

  [theme.breakpoints.up('lg')]: {
    marginBottom: theme.spacing(2.5),
  },
}));

interface Props {
  list: IPrice[];
}

export const PricesList = ({ list }: Props): JSX.Element => {
  return (
    <StyledList className="services-list">
      {list.map(price => (
        <div key={price.name} className="services-list-service">
          <dt>{price.name}</dt>
          <dd>{getPriceString(price)}</dd>
        </div>
      ))}
    </StyledList>
  );
};
