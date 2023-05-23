import { View } from "react-native";
import { Button, Heading } from "../../components";
import { useContext } from "react";
import { StoreContext } from "../../context/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../types";
import { Loading } from "../../components";
import { observer } from "mobx-react-lite";

export const Profile = observer(() => {
  const navigation = useNavigation<StackNavigation>();
  const { store } = useContext(StoreContext);
  const logout = async () => {
    await store.logout();
    navigation.navigate("Home");
  };
  return (
    <View>
      <Heading label="User info" />
      <Button type="danger" title="Logout" onPress={logout} />
      <Loading show={store.isLoading} />
    </View>
  );
});
