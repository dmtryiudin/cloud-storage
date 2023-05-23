export class SettingsDto {
  user: string;
  tableFiles: boolean;
  constructor(model: any) {
    const { user, tableFiles } = model;
    this.user = user;
    this.tableFiles = tableFiles;
  }
}
