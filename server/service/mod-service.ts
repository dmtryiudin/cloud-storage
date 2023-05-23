import { UserDto } from "../dtos/user-dto";
import userModel from "../models/user-model";
import mailService from "./mail-service";

class ModService {
  async banUser(login: string, reason: string) {
    const user = await userModel.findOne({ login });
    if (!user) {
      return null;
    }
    user.isBanned = true;
    await user.save();
    const { email, name } = user;
    if (email) {
      await mailService.sendBanMail(email, reason, name || login);
    }

    return { ...new UserDto(user) };
  }
}

export default new ModService();
