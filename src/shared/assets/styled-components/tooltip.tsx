import {
  alpha,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import { getTypography } from '../get-typography';

export const TooltipComponent = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    ...getTypography(theme, 14, 20),
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontWeight: 400,
    boxShadow: `0px 12px 24px ${alpha(theme.palette.text.primary, 0.12)}`,
  },
}));
