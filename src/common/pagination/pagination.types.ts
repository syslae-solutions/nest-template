export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface PaginationQueryParams {
  skip: number;
  take: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  lastPage: number;
  perPage: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}

type QueryResult<T> = T | PromiseLike<T>;

export interface PaginationQuery<T> {
  count: () => QueryResult<number>;
  findMany: (params: PaginationQueryParams) => QueryResult<T[]>;
}

export interface PaginateOptions<T> extends PaginationParams {
  query: PaginationQuery<T>;
}
