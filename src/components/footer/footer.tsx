import Image from 'next/image';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { Socials } from '../socials/socials';
import {
  StyledFooterInner,
  StyledFooterBottom,
  StyledFooterDocuments,
  StyledFooterInfo,
  StyledFooterList,
  StyledFooterTop,
} from './components';
import { ISiteSettings } from '@/shared/types';
import { getImageUrl } from '@/shared/assets';
import { ContainerComponent } from '@/components';

interface Props {
  siteSettings: ISiteSettings;
}

export const Footer = ({
  siteSettings: { footerLinks, copyrights, documents, logo, socials },
}: Props): JSX.Element => {
  return (
    <Box component="footer">
      <ContainerComponent>
        <StyledFooterInner>
          <StyledFooterTop>
            <StyledFooterInfo>
              <Image
                src={getImageUrl(logo.id, 'logo')}
                width="113"
                height="21"
                alt="логотип сайта"
              />
              <Box sx={{ ml: -1 }}>
                <Socials socials={socials} dense />
              </Box>
            </StyledFooterInfo>
            <StyledFooterList>
              {footerLinks.map(({ name, url }) => (
                <li key={name}>
                  <Link href={url}>{name}</Link>
                </li>
              ))}
            </StyledFooterList>
          </StyledFooterTop>
          <StyledFooterBottom>
            <StyledFooterDocuments>
              {documents.map(({ name, url }) => (
                <li key={name}>
                  <Link href={url}>{name}</Link>
                </li>
              ))}
            </StyledFooterDocuments>
            <Typography className="copyrights" variant="caption">
              {copyrights}
            </Typography>
          </StyledFooterBottom>
        </StyledFooterInner>
      </ContainerComponent>
    </Box>
  );
};
