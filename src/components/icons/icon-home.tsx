import { SvgIcon, SvgIconProps } from '@mui/material';

export const IconHome = (props: SvgIconProps): JSX.Element => (
  <SvgIcon width="16" height="16" viewBox="0 0 16 16" {...props}>
    <path
      d="M12.6667 6.66667V13C12.6667 13.5523 12.219 14 11.6667 14H4.33333C3.78105 14 3.33333 13.5523 3.33333 13V6.66667M14 8L8 2L2 8"
      stroke="#3FC3D0"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);
