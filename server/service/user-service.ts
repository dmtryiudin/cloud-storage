import { UpdateUserDto } from "../dtos/update-user-dto";
import userModel from "../models/user-model";
import { ApiError } from "../exceptions/api-error";
import { isCountryCodeValid } from "../utils";
import { UserDto } from "../dtos/user-dto";
import { unlink } from "fs";
import path from "path";

class UserService {
  async getOne(id: string) {
    const user = await userModel.findById(id);
    return { ...new UserDto(user) };
  }

  async getAll() {
    const users = await userModel.find();
    return users.map((e) => {
      return { ...new UserDto(e) };
    });
  }

  async updateOne(id: string, body: UpdateUserDto) {
    if (!isCountryCodeValid(body.country)) {
      throw ApiError.BadRequest("Invalid country code");
    }

    await userModel.findByIdAndUpdate(id, body);
    return this.getOne(id);
  }

  async deleteOne(id: string) {
    await userModel.findByIdAndDelete(id);
  }

  async updateAvatar(id: string, fileName: string) {
    const currentUser = await this.getOne(id);
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
    return this.getOne(id);
  }
}

export default new UserService();
