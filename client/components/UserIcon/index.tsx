import { useContext } from "react";
import { StoreContext } from "../../context/store";
import { FontAwesome } from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";
import { UserIconStyles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../screens/types";
import { API_URL } from "@env";

export const UserIcon = observer(() => {
  const navigation = useNavigation<StackNavigation>();
  const { store } = useContext(StoreContext);

  const { avatar } = UserIconStyles;
  return store.isAuth ? (
    store.user.avatar ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Profile", { login: store.user.login })
        }
      >
        <Image
          style={avatar}
          source={{
            uri: `${API_URL}${store.user.avatar}`,
          }}
        />
      </TouchableOpacity>
    ) : (
      <FontAwesome
        name="user-circle-o"
        size={40}
        color="black"
        onPress={() =>
          navigation.navigate("Profile", { login: store.user.login })
        }
      />
    )
  ) : (
    <AntDesign
      name="login"
      size={40}
      color="black"
      onPress={() => navigation.navigate("Auth")}
    />
  );
});
