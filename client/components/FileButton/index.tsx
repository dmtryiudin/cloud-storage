import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { fromBytesToMegabytes } from "../../utils/fromBytesToMegabytes";
import { FileButtonStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../screens/types";
import { IFileButtonProps } from "./types";
import React from "react";
import { Colors } from "../../styles/colors";

export const FileButton: React.FC<IFileButtonProps> = React.memo(
  ({ file, isDragging }) => {
    const { name, capacity } = file;
    const { text, wrapper } = FileButtonStyles;
    const navigation = useNavigation<StackNavigation>();
    return (
      <TouchableOpacity
        style={wrapper}
        onPress={() => navigation.navigate("FileSettings", { file })}
      >
        <FontAwesome
          name="file"
          size={70}
          color={isDragging ? Colors.primaryGreen4 : Colors.primaryGreen}
        />

        <Text style={text}>{name}</Text>
        <Text style={text}>({fromBytesToMegabytes(capacity)} MB)</Text>
      </TouchableOpacity>
    );
  }
);
