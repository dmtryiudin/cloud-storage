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
