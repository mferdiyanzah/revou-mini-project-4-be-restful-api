interface GenericPaginationResponse<T> {
  results: T[];
  page: number;
  limit: number;
}

export type { GenericPaginationResponse };
