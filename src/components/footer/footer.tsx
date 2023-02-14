import { Box, Typography } from '@mui/material';
import { Socials } from '../socials/socials';
import { StyledFooter, StyledFooterTop } from './components';

export const Footer = (): JSX.Element => {
  return (
    <StyledFooter>
      <StyledFooterTop>
        <Typography variant="h6">LogoLogo</Typography>
        <Box sx={{ ml: -1 }}>
          <Socials dense />
        </Box>
      </StyledFooterTop>
    </StyledFooter>
  );
};
