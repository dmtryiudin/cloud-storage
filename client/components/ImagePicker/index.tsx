import { IImagePickerProps } from "./types";
import { TouchableOpacity, View, Text, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";

export const ImagePicker: React.FC<IImagePickerProps> = ({
  avatar,
  setAvatar,
}) => {
  const imageUri = avatar?.type === "success" ? avatar.uri : "";

  const filePicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "image/*",
    });

    if (result?.type === "success") {
      setAvatar(result);
    }
  };

  return (
    <View>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ height: 100, width: 100 }} />
      )}
      <TouchableOpacity onPress={filePicker}>
        <Text> {"upload  doc"}</Text>
      </TouchableOpacity>
    </View>
  );
};
