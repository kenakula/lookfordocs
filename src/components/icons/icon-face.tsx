import { SvgIcon, SvgIconProps } from '@mui/material';

export const IconFace = (props: SvgIconProps): JSX.Element => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="#3FC3D0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="9"
      y="9.5"
      width="0.01"
      height="0.01"
      stroke="#3FC3D0"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <rect
      x="15"
      y="9.5"
      width="0.01"
      height="0.01"
      stroke="#3FC3D0"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M15.4649 14C14.7733 15.1956 13.4806 16 12 16C10.5195 16 9.22678 15.1956 8.53516 14"
      stroke="#3FC3D0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);
