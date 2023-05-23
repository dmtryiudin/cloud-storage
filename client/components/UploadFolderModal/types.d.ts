export interface IUploadFolderModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  finishedLoading?: () => {};
}
