import UserModel from "../models/user-model";
import bcrypt from "bcrypt";
import tokenService from "./token-service";
import { UserDto } from "../dtos/user-dto";
import { ApiError } from "../exceptions/api-error";
import { isCountryCodeValid, saveToken } from "../utils";
import { uuid } from "uuidv4";
import mailService from "./mail-service";
import userModel from "../models/user-model";
import roleModel from "../models/role-model";
import settingsModel from "../models/settings-model";

class AuthService {
  async registration(
    login: string,
    password: string,
    name: string,
    country: string
  ) {
    const candidate = await UserModel.findOne({ login });

    if (candidate) {
      throw ApiError.BadRequest(`User with login ${login} already exists`);
    }

    if (!isCountryCodeValid(country)) {
      throw ApiError.BadRequest("Invalid country code");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid();
    const userRole = await roleModel.findOne({ value: "USER" });
    const user = await UserModel.create({
      login,
      password: hashPassword,
      registrationDate: new Date(),
      name,
      country,
      activationLink,
      roles: [userRole?.value],
    });

    await settingsModel.create({ user: user._id });
    const userDto = new UserDto(user);
    return await saveToken(userDto);
  }

  async login(login: string, password: string) {
    const user = await UserModel.findOne({ login });
    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.UnauthorizedError();
    }
    const userDto = new UserDto(user);
    return await saveToken(userDto);
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (
      !userData ||
      !tokenFromDb ||
      typeof userData === "string" ||
      userData instanceof String
    ) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    return await saveToken(userDto);
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.Forbidden("Activation link is invalid");
    }
    user.isActivated = true;
    await user.save();
  }

  async setEmail(email: string, id: string) {
    const user = await userModel.findById(id);
    if (user!.isActivated) {
      throw ApiError.BadRequest("Email is already activated");
    }
    user!.email = email;
    await user!.save();
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/v1/auth/activate/${user!.activationLink}`
    );
    return user;
  }
}

export default new AuthService();
