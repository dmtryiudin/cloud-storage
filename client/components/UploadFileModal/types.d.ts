export interface IUploadFileModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  folder?: string;
  finishedLoading?: () => {};
}
