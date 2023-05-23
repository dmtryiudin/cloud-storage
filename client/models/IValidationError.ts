export interface IValidationError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface IValidationErrors {
  message: string;
  errors: IValidationError[];
}
