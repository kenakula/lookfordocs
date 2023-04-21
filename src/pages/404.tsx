import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { ButtonComponent } from '@/components';
import { Icon400 } from '@/components/icons';
import { StyledErrorContainer } from '@/shared/assets';

export default function Custom404Page() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <StyledErrorContainer className="error-boundary">
      <div className="error-boundary__inner">
        <Typography variant="h4" component="h1" textAlign="center">
          Мы не нашли такую страницу
        </Typography>
        <div className="error-boundary__image">
          <Icon400 />
        </div>
        <ButtonComponent
          text="Вернуться назад"
          variant="outlined"
          onClick={goBack}
        />
      </div>
    </StyledErrorContainer>
  );
}
