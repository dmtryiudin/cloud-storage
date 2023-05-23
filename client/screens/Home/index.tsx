import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Text, View } from "react-native";
import { StoreContext } from "../../context/store";
import { Loading } from "../../components";

export const Home = observer(() => {
  const { store } = useContext(StoreContext);
  return (
    <View>
      <Text>home</Text>
      <Loading show={store.isLoading} />
    </View>
  );
});
