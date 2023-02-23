import Link from 'next/link';
import { Typography } from '@mui/material';
import { IBreadCrumb } from '@/shared/types';

interface Props {
  data: IBreadCrumb;
}

export const Crumb = ({ data: { text, link } }: Props): JSX.Element => {
  if (link) {
    return (
      <Link className="breadcrumb-link" href={link}>
        {text}
      </Link>
    );
  }

  return <Typography>{text}</Typography>;
};
