import settingsModel from "../models/settings-model";

class SettingsService {
  async getForUser(id: string) {
    const settings = await settingsModel.findOne({ user: id });
    return settings;
  }

  async updateForUser(id: string, isDarkTheme: boolean, tableFiles: boolean) {
    const settings = await settingsModel.findOne({ user: id });
    settings!.isDarkTheme = isDarkTheme;
    settings!.tableFiles = tableFiles;
    await settings!.save();
    return settings;
  }
}

export default new SettingsService();
