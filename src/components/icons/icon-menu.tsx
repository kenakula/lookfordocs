import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';

export const IconMenu = (props: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon {...props}>
      <g clipPath="url(#clip0_146_1326)">
        <path
          d="M3 6H21M3 12H21M3 18H21"
          stroke="#071530"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_146_1326">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};
