import { SvgIcon, SvgIconProps } from '@mui/material';

export const IconArrowRight = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <g clipPath={`url(#clip-arrow-right-${props.id})`}>
      <path
        d="M8.99967 4L17.333 12.3333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.333 12.3333L8.99967 20.6667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id={`url(#clip-arrow-right-${props.id})`}>
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
);
