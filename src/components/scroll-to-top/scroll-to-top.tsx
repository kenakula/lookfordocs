import { Fab, Slide, styled } from '@mui/material';
import { useScroll } from '@/shared/hooks';
import { isBrowser } from '@/shared/assets';
import { IconArrowLeft } from '@/components/icons';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(2),
  width: 40,
  height: 40,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.misc.light,
  border: `1px solid ${theme.palette.misc.dark}`,
  boxShadow: '0px 4px 16px rgba(7, 20, 48, 0.04)',
  zIndex: theme.zIndex.appBar,

  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.misc.light,
  },

  '&:active': {
    boxShadow: '0px 8px 16px rgba(7, 20, 48, 0.04)',
    backgroundColor: theme.palette.misc.light,
  },

  '&:focus-visible': {
    outline: `4px solid ${theme.palette.primary.light}`,
  },

  svg: {
    width: 16,
    height: 16,
    transform: 'rotate(90deg)',
  },
}));

export const ScrollToTop = (): JSX.Element => {
  const {
    position: { y },
  } = useScroll(500);

  const handleClick = () => {
    if (isBrowser()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Slide direction="up" in={y > 500}>
      <StyledFab
        aria-label="Прокрутить наверх"
        onClick={handleClick}
        disableRipple
        disableFocusRipple
      >
        <IconArrowLeft id="scroll-top-icon" />
      </StyledFab>
    </Slide>
  );
};
