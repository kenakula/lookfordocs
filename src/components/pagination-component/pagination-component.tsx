import { Button, Pagination, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';
import { IconArrowLeft } from '../icons';
import { IconArrowRight } from '../icons/icon-arrow-right';

type PaginationVariant = 'default' | 'light';

const StyledPagination = styled('div', {
  shouldForwardProp: prop => prop !== 'variant',
})<{ variant: PaginationVariant }>(({ theme, variant }) => ({
  display: 'flex',
  paddingTop: theme.spacing(3),

  '.pagination-button': {
    fontSize: 0,
    color: theme.palette.text.primary,
    textTransform: 'none',
    fontWeight: 600,

    '&:hover': {
      color: theme.palette.primary.main,
      background: 'none',
    },

    '&:active': {
      color: theme.palette.primary.dark,
      background: 'none',
    },

    '&.Mui-disabled': {
      opacity: 0.5,
    },

    [theme.breakpoints.up('lg')]: {
      ...getTypography(theme, 14, 20),
    },
  },

  '.pagination-prev': {
    marginRight: 'auto',
  },

  '.pagination-next': {
    marginLeft: 'auto',
  },

  '.MuiPaginationItem-root': {
    ...getTypography(theme, 14, 20),
    fontWeight: 600,

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },

    '&:active': {
      color: theme.palette.primary.dark,
      backgroundColor: 'transparent',
    },

    '&.Mui-selected': {
      backgroundColor:
        variant === 'default'
          ? theme.palette.background.default
          : theme.palette.misc.dark,
    },

    '.MuiTouchRipple-root': {
      display: 'none',
    },
  },
}));

interface Props {
  setPage: (value: number) => void;
  page: number;
  total: number;
  limit: number;
  variant?: PaginationVariant;
}

export const PaginationComponent = ({
  setPage,
  page,
  total,
  limit,
  variant = 'default',
}: Props): JSX.Element | null => {
  const totalPages = Math.ceil(total / limit);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const changePage = (value: number): void => {
    if (value > total || value < 1) {
      return;
    }

    setPage(value);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <StyledPagination className="pagination" variant={variant}>
      <Button
        variant="text"
        disableRipple
        disableFocusRipple
        startIcon={<IconArrowLeft id="icon-left-pagination" />}
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
        className="pagination-prev pagination-button"
      >
        Назад
      </Button>
      <Pagination
        count={totalPages}
        shape="rounded"
        hideNextButton
        hidePrevButton
        page={page}
        onChange={handleChange}
      />
      <Button
        variant="text"
        disableRipple
        disableFocusRipple
        endIcon={<IconArrowRight id="icon-right-pagination" />}
        disabled={page === totalPages}
        onClick={() => changePage(page + 1)}
        className="pagination-next pagination-button"
      >
        Вперёд
      </Button>
    </StyledPagination>
  );
};
