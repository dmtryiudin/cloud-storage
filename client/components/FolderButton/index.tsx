import { TouchableOpacity, Text } from "react-native";
import { FolderButtonStyles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../screens/types";
import { IFolderButtonProps } from "./types";
import { FontAwesome } from "@expo/vector-icons";

export const FolderButton: React.FC<IFolderButtonProps> = ({
  folder,
  isChosen,
}) => {
  const { wrapper, text } = FolderButtonStyles;
  const { name, id } = folder;
  const navigation = useNavigation<StackNavigation>();
  return (
    <TouchableOpacity
      style={wrapper}
      onPress={() => navigation.navigate("Folder", { folderId: id })}
    >
      {isChosen ? (
        <FontAwesome name="folder-open" size={70} color="#047857" />
      ) : (
        <Entypo name="folder" size={70} color="#047857" />
      )}
      <Text style={text}>{name}</Text>
    </TouchableOpacity>
  );
};
