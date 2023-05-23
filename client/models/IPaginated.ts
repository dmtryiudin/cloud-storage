export interface IPaginated<T> {
  page: number;
  limit: number;
  maxCount: number;
  response: T[];
}
