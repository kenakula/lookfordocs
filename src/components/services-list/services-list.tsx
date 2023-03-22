import { getPriceString, getTypography } from '@/shared/assets';
import { IService } from '@/shared/types';
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
  list: IService[];
}

export const ServicesList = ({ list }: Props): JSX.Element => {
  return (
    <StyledList className="services-list">
      {list.map(({ name, price, priceFrom, value }) => (
        <div key={name} className="services-list-service">
          <dt>{value}</dt>
          <dd>{getPriceString(price, priceFrom)}</dd>
        </div>
      ))}
    </StyledList>
  );
};
