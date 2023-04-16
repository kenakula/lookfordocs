import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { ButtonComponent } from '@/components';
import { Icon500 } from '@/components/icons';
import { StyledErrorContainer } from '@/shared/assets';

export default function Custom500() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <StyledErrorContainer className="error-boundary">
      <div className="error-boundary__inner">
        <Typography variant="h4" component="h1" textAlign="center">
          Мы всё уронили
        </Typography>
        <div className="error-boundary__image">
          <Icon500 />
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
