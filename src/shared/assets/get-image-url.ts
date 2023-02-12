export const getImageUrl = (id: string, name: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

  return `${baseUrl}/assets/${id}/${name}`;
};
