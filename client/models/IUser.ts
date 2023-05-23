export interface IUser {
  id: string;
  login: string;
  email: string;
  name: string;
  country: string;
  avatar: string;
  registrationDate: string;
  filesCapacity: number;
  roles: string[];
  isBanned: boolean;
}

export interface IPaginatedUsers {
  page: number;
  limit: number;
  maxCount: number;
  response: IUser[];
}
