import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';

export const IconClose = (props: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon {...props}>
      <g clipPath={`url(#clip-${props.id})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.70711 6.29293C7.31658 5.9024 6.68342 5.9024 6.29289 6.29293C5.90237 6.68345 5.90237 7.31662 6.29289 7.70714L10.5858 12L6.29289 16.2929C5.90237 16.6835 5.90237 17.3166 6.29289 17.7071C6.68342 18.0977 7.31658 18.0977 7.70711 17.7071L12 13.4142L16.2929 17.7071C16.6834 18.0977 17.3166 18.0977 17.7071 17.7071C18.0976 17.3166 18.0976 16.6835 17.7071 16.2929L13.4142 12L17.7071 7.70714C18.0976 7.31662 18.0976 6.68345 17.7071 6.29293C17.3166 5.9024 16.6834 5.9024 16.2929 6.29293L12 10.5858L7.70711 6.29293Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={`clip-${props.id}`}>
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};
