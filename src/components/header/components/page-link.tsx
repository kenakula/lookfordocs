import { TooltipComponent } from '@/shared/assets';
import { ListItem } from '@mui/material';
import Link from 'next/link';

interface Props {
  className: string;
  url: string;
  text: string;
  developing?: boolean;
}

export const PageLink = ({
  className,
  url,
  text,
  developing = false,
}: Props): JSX.Element => {
  if (!developing) {
    return (
      <ListItem>
        <Link className={className} href={url}>
          {text}
        </Link>
      </ListItem>
    );
  }

  return (
    <TooltipComponent title="уже в разработке" placement="bottom">
      <ListItem>
        <Link
          className={`${className} ${developing ? 'disabled' : ''}`}
          href={url}
        >
          {text}
        </Link>
      </ListItem>
    </TooltipComponent>
  );
};
