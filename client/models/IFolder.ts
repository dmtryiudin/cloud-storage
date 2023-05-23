export interface IFolder {
  owner: string;
  name: string;
  deleteDate: number;
  isPublic: boolean;
  filesCapacity: number;
  files: string[];
  id: string;
}
