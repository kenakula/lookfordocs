export const capitalize = (str: string): string =>
  str[0].toUpperCase() + str.slice(1);

export const capitilizeName = (firstName: string, lastName?: string): string =>
  [firstName, lastName]
    .filter(name => Boolean(name))
    .map(name => {
      if (name) {
        return capitalize(name);
      }
    })
    .join(' ');

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
