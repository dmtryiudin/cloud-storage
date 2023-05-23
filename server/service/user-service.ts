import { UpdateUserDto } from "../dtos/update-user-dto";
import userModel from "../models/user-model";
import { ApiError } from "../exceptions/api-error";
import { isCountryCodeValid } from "../utils";
import { UserDto } from "../dtos/user-dto";
import { unlink } from "fs";
import path from "path";

class UserService {
  async getOne(login: string) {
    const user = await userModel.findOne({ login });
    if (!user) {
      return null;
    }
    return { ...new UserDto(user) };
  }

  async getOneById(id: string) {
    const user = await userModel.findById(id);
    return { ...new UserDto(user) };
  }

  async getAll(page = 0, limit = 100) {
    if (limit > 100) {
      limit = 100;
    }
    const users = await userModel.find();
    return {
      page,
      limit,
      response: users.slice(page * limit, (page + 1) * limit).map((e) => {
        return { ...new UserDto(e) };
      }),
      maxCount: users.length,
    };
  }

  async updateOne(id: string, body: UpdateUserDto) {
    if (!isCountryCodeValid(body.country)) {
      throw ApiError.BadRequest("Invalid country code");
    }

    await userModel.findByIdAndUpdate(id, body);
    return this.getOneById(id);
  }

  async deleteOne(id: string) {
    await userModel.findByIdAndDelete(id);
  }

  async updateAvatar(id: string, fileName: string) {
    const currentUser = await this.getOneById(id);
    const currentAvatar = currentUser.avatar;

    if (currentAvatar) {
      const currentAvatarName = currentAvatar.split("/")[3];
      await unlink(
        path.resolve(`./upload/avatars/${currentAvatarName}`),
        (err) => {
          if (err) return null;
        }
      );
    }

    await userModel.findByIdAndUpdate(id, {
      avatar: `/file/avatar/${fileName}`,
    });
    return this.getOneById(id);
  }
}

export default new UserService();
