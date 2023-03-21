import { Breakpoints } from '@/shared/enums';
import { Dialog, IconButton, styled, useMediaQuery } from '@mui/material';
import { ContainerComponent } from '@/components';
import { IconClose } from '../icons';
import { getTypography } from '@/shared/assets';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiContainer-root': {
    padding: theme.spacing(2.5, 2),
  },

  '.dialog-header': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    paddingRight: 40,

    '.MuiButtonBase-root': {
      position: 'absolute',
      right: 10,
      top: 10,
      color: theme.palette.text.primary,

      '&:focus-visible': {
        outline: `4px solid ${theme.palette.primary.light}`,
      },
    },

    h3: {
      ...getTypography(theme, 20, 23),
      margin: '0 auto 0 0',
      fontWeight: 600,
    },
  },

  [theme.breakpoints.up('lmd')]: {
    '.MuiContainer-root': {
      padding: 0,
    },

    '.MuiPaper-root': {
      padding: theme.spacing(5, 4),
      maxWidth: 528,
    },
  },
}));

interface Props {
  children: JSX.Element | JSX.Element[];
  openState: boolean;
  onClose: () => void;
  title?: string;
}

export const DialogComponent = ({
  children,
  openState,
  onClose,
  title,
}: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);

  return (
    <StyledDialog
      onClose={onClose}
      open={openState}
      fullWidth
      fullScreen={!isTablet}
      keepMounted
    >
      <ContainerComponent>
        {title && (
          <div className="dialog-header">
            <h3 className="dialog-title">{title}</h3>
            <IconButton onClick={onClose} disableFocusRipple>
              <IconClose id="dialog-close" />
            </IconButton>
          </div>
        )}
        {children}
      </ContainerComponent>
    </StyledDialog>
  );
};
