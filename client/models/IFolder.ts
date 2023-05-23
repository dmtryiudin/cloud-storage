import { IFile } from "./IFile";

export interface IFolder {
  owner: string;
  name: string;
  deleteDate: number;
  isPublic: boolean;
  filesCapacity: number;
  files: IFile[];
  id: string;
}
