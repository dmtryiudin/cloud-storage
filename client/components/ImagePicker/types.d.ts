export interface IImagePickerProps {
  avatar: DocumentPicker.DocumentResult | null | string;
  setAvatar: React.Dispatch<
    React.SetStateAction<DocumentPicker.DocumentResult | null | string>
  >;
}
