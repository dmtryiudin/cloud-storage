import { ObjectId } from "mongodb";
import { FileDto } from "./file-dto";

export class FolderDto {
  owner: ObjectId;
  name: string;
  deleteDate: number;
  isPublic: boolean;
  files: Array<FileDto>;
  filesCapacity: number;

  constructor(model: any) {
    const { owner, name, deleteDate, isPublic, files, filesCapacity } = model;

    this.owner = owner;
    this.name = name;
    this.deleteDate = deleteDate;
    this.isPublic = isPublic;
    this.files = files;
    this.filesCapacity = filesCapacity;
  }
}
