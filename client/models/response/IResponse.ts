import { Error } from "../IError";

export interface IResponse<T> {
  isLoading: boolean;
  error: Error;
  data: T | null;
}
