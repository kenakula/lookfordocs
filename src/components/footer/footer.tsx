import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import {
  StyledFooterInner,
  StyledFooterBottom,
  StyledFooterDocuments,
  StyledFooterInfo,
  StyledFooterList,
  StyledFooterTop,
  FooterLink,
} from './components';
import { ISiteSettings } from '@/shared/types';
import { getActiveStateClassName, getImageUrl } from '@/shared/assets';
import { ContainerComponent } from '@/components';
import { Socials } from '../socials/socials';
import { useRouter } from 'next/router';

interface Props {
  siteSettings: ISiteSettings;
}

export const Footer = ({
  siteSettings: { footerLinks, copyrights, documents, logo, socials },
}: Props): JSX.Element => {
  const router = useRouter();

  return (
    <footer>
      <ContainerComponent>
        <StyledFooterInner>
          <StyledFooterTop>
            <StyledFooterInfo>
              <Image
                src={getImageUrl(logo)}
                width="150"
                height="20"
                alt="логотип сайта"
              />
              <Box sx={{ ml: -1 }}>
                <Socials socials={socials} dense />
              </Box>
            </StyledFooterInfo>
            <StyledFooterList>
              {footerLinks.map(({ name, url }) => (
                <FooterLink
                  key={name}
                  url={url}
                  text={name}
                  className={getActiveStateClassName(url, router.pathname)}
                />
              ))}
            </StyledFooterList>
          </StyledFooterTop>
          <StyledFooterBottom>
            <StyledFooterDocuments>
              {documents.map(({ name, url }) => (
                <FooterLink
                  key={name}
                  url={url}
                  text={name}
                  className={getActiveStateClassName(url, router.pathname)}
                />
              ))}
            </StyledFooterDocuments>
            <Typography className="copyrights" variant="caption">
              {copyrights}
            </Typography>
          </StyledFooterBottom>
        </StyledFooterInner>
      </ContainerComponent>
    </footer>
  );
};
