export const capitalize = (str: string): string =>
  str[0].toUpperCase() + str.slice(1);

export const capitalizeName = (str: string): string =>
  str.split(' ').map(capitalize).join(' ').split('-').map(capitalize).join('-');

export const getHighlightedLetters = (
  str: string,
  substr: string,
): JSX.Element => {
  const capitalizedStr = str
    .split(' ')
    .filter(word => word.length)
    .map(word => capitalize(word))
    .join(' ');
  const startIndex = capitalizedStr.toLowerCase().indexOf(substr.toLowerCase());

  if (startIndex === -1) {
    return <span>{capitalizedStr}</span>;
  }

  const lastIndex = startIndex + substr.length;
  const highlightedStr = capitalizedStr
    .split('')
    .splice(startIndex, substr.length)
    .join('');
  const firstPartStr = capitalizedStr.slice(0, startIndex);
  const lastPartStr = capitalizedStr.slice(lastIndex);

  return (
    <span>
      <span>{firstPartStr}</span>
      <span className="highlighted">{highlightedStr}</span>
      <span>{lastPartStr}</span>
    </span>
  );
};

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const getAvatarLetters = (str: string): string => {
  const arr = str.split(' ');

  if (arr.length === 1) {
    return str[0].toUpperCase() + str[1].toUpperCase();
  }

  return arr
    .map(part => part[0])
    .join('')
    .toUpperCase();
};
