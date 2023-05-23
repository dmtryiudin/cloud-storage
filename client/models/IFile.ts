export interface IFile {
  owner?: string;
  name: string;
  deleteDate?: number;
  href: string;
  isPublic?: boolean;
  capacity: number;
  folder?: string;
}
