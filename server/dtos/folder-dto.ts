import { FileDto } from "./file-dto";

export class FolderDto {
  owner: string;
  name: string;
  deleteDate: Date;
  isPublic: boolean;
  files: Array<FileDto>;

  constructor(model: any) {
    const { owner, name, deleteDate, isPublic, files } = model;

    this.owner = owner;
    this.name = name;
    this.deleteDate = deleteDate;
    this.isPublic = isPublic;
    this.files = files;
  }
}
