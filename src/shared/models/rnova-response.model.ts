export interface RnovaResponseModel<T> {
  data: T[];
  error: number;
}

export interface RnovaObjectResponse<T> {
  data: Record<string, T[]>;
  error: number;
}
