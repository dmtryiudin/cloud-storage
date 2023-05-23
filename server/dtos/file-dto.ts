import { ObjectId } from "mongodb";

export class FileDto {
  owner?: ObjectId;
  name: string;
  deleteDate?: number;
  href: string;
  isPublic?: boolean;
  folder?: string;
  capacity: number;

  constructor(model: any) {
    const { owner, name, deleteDate, href, isPublic, folder, capacity } = model;

    this.owner = owner;
    this.name = name;
    this.deleteDate = deleteDate;
    this.href = href;
    this.isPublic = isPublic;
    this.folder = folder;
    this.capacity = capacity;
  }
}
