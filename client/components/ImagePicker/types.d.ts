export interface IImagePickerProps {
  avatar: DocumentPicker.DocumentResult | null;
  setAvatar: React.Dispatch<
    React.SetStateAction<DocumentPicker.DocumentResult | null>
  >;
}
