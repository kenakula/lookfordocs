import { Breakpoints } from '@/shared/enums';
import { Dialog, IconButton, styled, useMediaQuery } from '@mui/material';
import { ContainerComponent } from '@/components';
import { getTypography } from '@/shared/assets';
import { IconClose } from '../icons';
import Image from 'next/image';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiContainer-root': {
    padding: theme.spacing(2.5, 2),
    overflowY: 'auto',
    maxHeight: '100%',
  },

  '.MuiPaper-root': {
    overflow: 'hidden',
  },

  '.dialog-header': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    paddingRight: 40,

    '.MuiButtonBase-root': {
      position: 'absolute',
      right: -12,
      top: -7,
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

  '.dialog-image-wrapper': {
    flexShrink: 0,
    marginRight: theme.spacing(1.5),
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    width: 48,
    height: 48,

    img: {
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },

  [theme.breakpoints.up('lmd')]: {
    '.MuiContainer-root': {
      padding: '40px 28px 40px 32px',

      '&::-webkit-scrollbar': {
        width: 4,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.background.default,
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 23,
        backgroundColor: theme.palette.misc.dark,
      },
    },

    '.MuiPaper-root': {
      padding: '2px 2px 2px 0',
      maxWidth: 528,
    },

    '.dialog-image-wrapper': {
      width: 60,
      height: 60,
    },

    '.dialog-header': {
      marginBottom: theme.spacing(4),

      h3: {
        ...getTypography(theme, 24, 28),
      },
    },
  },
}));

interface Props {
  children: JSX.Element | JSX.Element[];
  openState: boolean;
  onClose: () => void;
  title: string;
  imageUrl?: string;
}

export const DialogComponent = ({
  openState,
  children,
  imageUrl,
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
    >
      <ContainerComponent>
        <div className="dialog-header">
          {imageUrl ? (
            <div className="dialog-image-wrapper">
              <Image src={imageUrl} width={60} height={60} alt="" />
            </div>
          ) : null}
          <h3 className="dialog-title">{title}</h3>
          <IconButton onClick={onClose} disableFocusRipple>
            <IconClose id="dialog-close" />
          </IconButton>
        </div>
        {children}
      </ContainerComponent>
    </StyledDialog>
  );
};
