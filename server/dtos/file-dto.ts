export class FileDto {
  owner?: string;
  name: string;
  deleteDate?: number;
  href: string;
  isPublic?: boolean;
  folder?: string;

  constructor(model: any) {
    const { owner, name, deleteDate, href, isPublic, folder } = model;

    this.owner = owner;
    this.name = name;
    this.deleteDate = deleteDate;
    this.href = href;
    this.isPublic = isPublic;
    this.folder = folder;
  }
}
