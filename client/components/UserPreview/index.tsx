import { View, Image, Text, TouchableOpacity } from "react-native";
import { IUser } from "../../models/IUser";
import { FontAwesome, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { API_URL } from "@env";
import { UserPreviewStyles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../screens/types";
import { Colors } from "../../styles/colors";

export const UserPreview: React.FC<IUser> = ({
  avatar,
  login,
  name,
  isActivated,
  isBanned,
  roles,
}) => {
  const { userAvatar, text, wrapper, textWrapper } = UserPreviewStyles;
  const navigation = useNavigation<StackNavigation>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile", { login })}
      style={wrapper}
    >
      {avatar ? (
        <Image
          style={userAvatar}
          source={{
            uri: `${API_URL}${avatar}`,
          }}
        />
      ) : (
        <FontAwesome name="user-circle-o" size={50} color={Colors.black} />
      )}
      <View style={textWrapper}>
        <Text style={text}>{name || login}</Text>
        {isActivated && (
          <MaterialIcons
            name="verified"
            size={18}
            color={Colors.primaryGreen2}
          />
        )}
        {roles.includes("MOD") && (
          <FontAwesome5 name="crown" size={18} color={Colors.warning} />
        )}
        {isBanned && (
          <FontAwesome5 name="ban" size={18} color={Colors.danger} />
        )}
      </View>
    </TouchableOpacity>
  );
};
