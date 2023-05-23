export class UserDto {
  email: string;
  login: string;
  id: string;
  name: string;
  country: string;
  avatar: string;
  registrationDate: string;
  constructor(model: any) {
    const { login, _id, name, country, avatar, registrationDate, email } =
      model;
    this.login = login;
    this.id = _id;
    this.name = name;
    this.country = country;
    this.avatar = avatar;
    this.registrationDate = registrationDate;
    this.email = email;
  }
}
