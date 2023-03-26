import Link from 'next/link';

interface Props {
  url: string;
  text: string;
  developing?: boolean;
}

export const FooterLink = ({ url, text, developing }: Props): JSX.Element => {
  return (
    <li>
      <Link className={developing ? 'disabled' : ''} href={url}>
        {text}
      </Link>
    </li>
  );
};
