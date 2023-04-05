export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

export interface StrapiSingleton<T> {
  data: T;
}

export interface StrapiCollection<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiEditionsInfo {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
