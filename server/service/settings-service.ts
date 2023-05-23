import { SettingsDto } from "../dtos/settings-dto";
import settingsModel from "../models/settings-model";

class SettingsService {
  async getForUser(id: string) {
    const settings = await settingsModel.findOne({ user: id });
    const settingsDto = new SettingsDto(settings);
    return settingsDto;
  }

  async updateForUser(id: string, tableFiles: boolean) {
    const settings = await settingsModel.findOne({ user: id });
    settings!.tableFiles = tableFiles;
    await settings!.save();
    const settingsDto = new SettingsDto(settings);
    return settingsDto;
  }
}

export default new SettingsService();
