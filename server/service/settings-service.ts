import settingsModel from "../models/settings-model";

class SettingsService {
  async getForUser(id: string) {
    const settings = await settingsModel.findOne({ user: id });
    return settings;
  }

  async updateForUser(id: string, tableFiles: boolean) {
    const settings = await settingsModel.findOne({ user: id });
    settings!.tableFiles = tableFiles;
    await settings!.save();
    return settings;
  }
}

export default new SettingsService();
