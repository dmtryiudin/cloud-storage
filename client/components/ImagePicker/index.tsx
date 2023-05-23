import { IImagePickerProps } from "./types";
import { View, Image, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ImagePickerStyles } from "./styles";
import { Button } from "../Button";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../styles/colors";

export const ImagePicker: React.FC<IImagePickerProps> = ({
  avatar,
  setAvatar,
}) => {
  const imageUri =
    typeof avatar === "string"
      ? avatar
      : avatar?.type === "success"
      ? avatar.uri
      : "";

  const filePicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "image/*",
    });

    if (result?.type === "success") {
      setAvatar(result);
    }
  };

  const { wrapper, image, button, imageWrapper } = ImagePickerStyles;

  return (
    <View style={wrapper}>
      {avatar ? (
        imageUri && (
          <View style={imageWrapper}>
            <TouchableOpacity onPress={filePicker}>
              <Image source={{ uri: imageUri }} style={image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAvatar(null)}>
              <AntDesign name="delete" size={50} color={Colors.danger} />
            </TouchableOpacity>
          </View>
        )
      ) : (
        <View style={button}>
          <Button title="Upload file" onPress={filePicker} type="secondary" />
        </View>
      )}
    </View>
  );
};
