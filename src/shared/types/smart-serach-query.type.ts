export type SmartSearchQuery<T> = {
  name: keyof T;
  value: string;
};
