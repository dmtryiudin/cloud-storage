import { TouchableOpacity, Text } from "react-native";
import { FolderButtonStyles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../screens/types";
import { IFolderButtonProps } from "./types";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Colors } from "../../styles/colors";

export const FolderButton: React.FC<IFolderButtonProps> = React.memo(
  ({ folder, isChosen }) => {
    const { wrapper, text } = FolderButtonStyles;
    const { name, id } = folder;
    const navigation = useNavigation<StackNavigation>();
    return (
      <TouchableOpacity
        style={wrapper}
        onPress={() => navigation.navigate("Folder", { ...folder })}
      >
        {isChosen ? (
          <FontAwesome
            name="folder-open"
            size={70}
            color={Colors.primaryGreen}
          />
        ) : (
          <Entypo name="folder" size={70} color={Colors.primaryGreen} />
        )}
        <Text style={text}>{name}</Text>
      </TouchableOpacity>
    );
  }
);
