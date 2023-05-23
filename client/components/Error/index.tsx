import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ErrorStyles } from "./styles";
import { Colors } from "../../styles/colors";

export const Error = () => {
  const { wrapper, textWrapper, text } = ErrorStyles;
  return (
    <View style={wrapper}>
      <View style={textWrapper}>
        <MaterialIcons name="error-outline" size={24} color={Colors.danger} />
        <Text style={text}>Something went wrong</Text>
      </View>
    </View>
  );
};
