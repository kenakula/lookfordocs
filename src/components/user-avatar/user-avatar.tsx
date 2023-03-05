import { Avatar, styled, SxProps } from '@mui/material';
import {
  getAvatarLetters,
  getImageUrl,
  getTypography,
  stringToColor,
} from '@/shared/assets';
import { IImage } from '@/shared/types';

interface Props {
  name: string;
  image?: IImage;
  variant?: 'circular' | 'rounded' | 'square';
  style?: SxProps;
}

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: prop => prop !== 'textColor',
})<{ textColor?: string }>(({ theme, textColor }) => ({
  ...getTypography(theme, 27, 32),
  width: 56,
  height: 56,
  color: textColor ?? theme.palette.text.primary,
  backgroundColor: theme.palette.misc.dark,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const UserAvatar = ({
  name,
  image,
  variant,
  style,
}: Props): JSX.Element => {
  const nameLetters = getAvatarLetters(name);

  if (image) {
    return (
      <StyledAvatar
        sx={style}
        variant={variant}
        src={getImageUrl(image.id, name)}
        alt={name}
      />
    );
  }

  return (
    <StyledAvatar textColor={stringToColor(name)} sx={style}>
      {nameLetters}
    </StyledAvatar>
  );
};
