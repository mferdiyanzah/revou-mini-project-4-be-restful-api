interface GenericPaginationRequest {
  search: string;
  limit: number;
  offset: number;
  sort?: string;
  order?: string;
}

interface GenericPaginationResponse<T> {
  results: T[];
  page: number;
  limit: number;
}

export type { GenericPaginationRequest, GenericPaginationResponse };
