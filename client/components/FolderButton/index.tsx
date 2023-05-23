import { TouchableOpacity, Text } from "react-native";
import { IFolder } from "../../models/IFolder";
import { FolderButtonStyles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../screens/types";

export const FolderButton: React.FC<IFolder> = (folder) => {
  const { wrapper, text } = FolderButtonStyles;
  const { name, id } = folder;
  const navigation = useNavigation<StackNavigation>();
  return (
    <TouchableOpacity
      style={wrapper}
      onPress={() => navigation.navigate("Folder", { folderId: id })}
    >
      <Entypo name="folder" size={70} color="#047857" />
      <Text style={text}>{name}</Text>
    </TouchableOpacity>
  );
};
