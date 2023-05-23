import folderController from "../controllers/folder-controller";
import { UserDto } from "../dtos/user-dto";
import { ApiError } from "../exceptions/api-error";
import userModel from "../models/user-model";
import fileService from "./file-service";
import folderService from "./folder-service";
import mailService from "./mail-service";

class ModService {
  async banUser(login: string, reason: string) {
    const user = await userModel.findOne({ login });
    if (!user) {
      throw ApiError.NotFound();
    }
    user.isBanned = true;
    await user.save();
    const { email, name, isActivated, _id } = user;
    if (isActivated) {
      await mailService.sendBanMail(email!, reason, name || login);
    }
    await fileService.deleteAllForUser(_id.toString());
    await folderService.deleteAllForUser(_id.toString());

    return { ...new UserDto(user) };
  }
}

export default new ModService();
