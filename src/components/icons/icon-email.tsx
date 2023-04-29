import { SvgIcon, SvgIconProps } from '@mui/material';

export const IconEmail = (props: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon {...props}>
      <g clipPath={`url(#clip-email-${props.id})`}>
        <path d="M12 1.95C6.48 1.95 2 6.43 2 11.95C2 17.47 6.48 21.95 12 21.95H17V19.95H12C7.66 19.95 4 16.29 4 11.95C4 7.61 7.66 3.95 12 3.95C16.34 3.95 20 7.61 20 11.95V13.38C20 14.17 19.29 14.95 18.5 14.95C17.71 14.95 17 14.17 17 13.38V11.95C17 9.19 14.76 6.95 12 6.95C9.24 6.95 7 9.19 7 11.95C7 14.71 9.24 16.95 12 16.95C13.38 16.95 14.64 16.39 15.54 15.48C16.19 16.37 17.31 16.95 18.5 16.95C20.47 16.95 22 15.35 22 13.38V11.95C22 6.43 17.52 1.95 12 1.95ZM12 14.95C10.34 14.95 9 13.61 9 11.95C9 10.29 10.34 8.95 12 8.95C13.66 8.95 15 10.29 15 11.95C15 13.61 13.66 14.95 12 14.95Z" />
      </g>
      <defs>
        <clipPath id={`clip-email-${props.id}`}>
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};
