import { SvgIcon, SvgIconProps } from '@mui/material';

export const IconSearch = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <g clipPath={`url(#clip-search-${props.id})`}>
      <path
        d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
    <defs>
      <clipPath id={`clip-search-${props.id}`}>
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
);
