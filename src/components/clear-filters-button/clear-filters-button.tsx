import { Button, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

const StyledClearButton = styled(Button)(({ theme }) => ({
  ...getTypography(theme, 14, 23),
  padding: 0,
  fontWeight: 400,
  textTransform: 'none',
  color: theme.palette.secondary.light,

  '&:hover': {
    background: 'none',
    color: theme.palette.primary.main,
  },

  '&:active': {
    color: theme.palette.primary.dark,
  },
}));

interface Props {
  resetFilters: () => void;
}

export const ClearFiltersButton = ({ resetFilters }: Props): JSX.Element => {
  return (
    <StyledClearButton
      type="button"
      variant="text"
      disableFocusRipple
      disableRipple
      onClick={resetFilters}
    >
      Очистить все
    </StyledClearButton>
  );
};
