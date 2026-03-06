export interface PaginatedResponseDTO<T> {
  list: T[];
  rpp: number;
  page: number;
  more: boolean;
}
