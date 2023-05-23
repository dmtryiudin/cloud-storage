import { AxiosResponse } from "axios";
import { IPaginatedUsers, IUser } from "../models/IUser";
import axiosInstance from "../http";
import { addQueryParams } from "../utils/addQueryParams";
import { validateLogin } from "../utils/validateLogin";

export default class UserService {
  static async getUsers(
    page: string,
    limit: string
  ): Promise<AxiosResponse<IPaginatedUsers>> {
    const url = "/user" + addQueryParams({ page, limit });
    return await axiosInstance.get<IPaginatedUsers>(url);
  }

  static async getUser(login: string): Promise<AxiosResponse<IUser>> {
    return await axiosInstance.get<IUser>(`/user/${validateLogin(login)}`);
  }
}
