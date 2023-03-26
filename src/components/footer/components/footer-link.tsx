import Link from 'next/link';

interface Props {
  url: string;
  text: string;
  className: string;
}

export const FooterLink = ({ url, text, className }: Props): JSX.Element => {
  return (
    <li>
      <Link className={className} href={url}>
        {text}
      </Link>
    </li>
  );
};
