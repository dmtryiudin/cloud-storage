import { StatusBar, View } from "react-native";
import { LoginForm } from "./components";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StoreContext } from "./context/store";
import { store } from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((accessToken) => {
      if (accessToken) {
        store.checkAuth();
      }
    });
  }, []);

  const [loaded] = useFonts({
    "Manrope-Bold": require("./assets/fonts/Manrope/static/Manrope-Bold.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope/static/Manrope-SemiBold.ttf"),
    "Manrope-Regular": require("./assets/fonts/Manrope/static/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./assets/fonts/Manrope/static/Manrope-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <StoreContext.Provider
      value={{
        store,
      }}
    >
      <View>
        <LoginForm />
        <StatusBar />
      </View>
    </StoreContext.Provider>
  );
}
