import Link from 'next/link';

interface Props {
  url: string;
  text: string;
}

export const FooterLink = ({ url, text }: Props): JSX.Element => {
  return (
    <li>
      <Link href={url}>{text}</Link>
    </li>
  );
};
