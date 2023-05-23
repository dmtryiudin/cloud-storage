export interface IError {
  statusCode: number;
  data: any;
}

export type Error = IError | null;
