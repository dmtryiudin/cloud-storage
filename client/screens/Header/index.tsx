import { TouchableOpacity, View } from "react-native";
import { HeaderStyles } from "./styles";
import { UserIcon } from "../../components";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../types";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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
      <TouchableOpacity
        onPress={() => navigation.navigate("FilesAndFoldersForUser")}
      >
        <Ionicons name="md-file-tray-stacked-sharp" size={40} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Trash")}>
        <FontAwesome name="trash-o" size={40} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Entypo name="home" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};
