/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, styled } from '@mui/material';
import React, { ReactNode } from 'react';
import { IconVoid } from '../icons';
import { ButtonComponent } from '../button-component/button-component';
import { StyledErrorContainer } from '@/shared/assets';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <StyledErrorContainer className="error-boundary">
          <div className="error-boundary__inner">
            <Typography variant="h4" component="h1" textAlign="center">
              Произошла ошибка
            </Typography>
            <div className="error-boundary__image">
              <IconVoid />
            </div>
            <Typography variant="caption" textAlign="center">
              Есть шанс, что сработает
            </Typography>
            <ButtonComponent
              text="Попробовать снова"
              variant="outlined"
              onClick={() => this.setState({ hasError: false })}
            />
          </div>
        </StyledErrorContainer>
      );
    }

    return this.props.children;
  }
}
