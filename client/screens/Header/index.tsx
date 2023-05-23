import { TouchableOpacity, View } from "react-native";
import { HeaderStyles } from "./styles";
import { UserIcon } from "../../components";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../types";

export const Header = () => {
  const { wrapper } = HeaderStyles;
  const navigation = useNavigation<StackNavigation>();

  return (
    <View style={wrapper}>
      <UserIcon />
      <TouchableOpacity onPress={() => navigation.navigate("ClientSettings")}>
        <Feather name="settings" size={40} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SearchUsers")}>
        <MaterialIcons name="person-search" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};
