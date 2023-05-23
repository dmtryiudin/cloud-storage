import userModel from "../models/user-model";
import { ApiError } from "../exceptions/api-error";
import { isCountryCodeValid } from "../utils";
import { UserDto } from "../dtos/user-dto";
import { unlink } from "fs";
import path from "path";
import settingsModel from "../models/settings-model";

class UserService {
  async getOne(login: string) {
    const user = await userModel.findOne({ login });
    if (!user) {
      throw ApiError.NotFound();
    }
    return { ...new UserDto(user) };
  }

  async getAll(page: number, limit: number, substr: string) {
    if (limit > 100) {
      limit = 100;
    }
    const users = await userModel.find();
    let response = users.slice(page * limit, (page + 1) * limit).map((e) => {
      return { ...new UserDto(e) };
    });

    if (substr) {
      response = response.filter((item) =>
        item.login.toLowerCase().includes(substr.toLocaleLowerCase())
      );
    }
    return {
      page,
      limit,
      response,
      maxCount: response.length,
    };
  }

  async updateOne(id: string, name: string, country: string) {
    if (!isCountryCodeValid(country)) {
      throw ApiError.BadRequest("Invalid country code");
    }

    let user = await userModel.findById(id);

    user!.name = name;
    user!.country = country;
    await user!.save();
    return user;
  }

  async deleteOne(id: string) {
    await settingsModel.deleteOne({ user: id });
    await userModel.findByIdAndDelete(id);
  }

  async updateAvatar(id: string, fileName: string) {
    const currentUser = await userModel.findById(id);

    const currentAvatar = currentUser!.avatar;

    if (currentAvatar) {
      const currentAvatarName = currentAvatar.split("/")[3];
      unlink(path.resolve(`./upload/avatars/${currentAvatarName}`), (err) => {
        if (err) return null;
      });
    }

    currentUser!.avatar = `/file/avatar/${fileName}`;
    await currentUser!.save();
    return currentUser;
  }
}

export default new UserService();
