import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StoreContext } from "./context/store";
import { store } from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navigation } from "./screens/Navigation";
import { EventProvider } from "react-native-outside-press";

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
    "Manrope-Light": require("./assets/fonts/Manrope/static/Manrope-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <EventProvider style={{ flex: 1 }}>
      <StoreContext.Provider
        value={{
          store,
        }}
      >
        <Navigation />
        <StatusBar />
      </StoreContext.Provider>
    </EventProvider>
  );
}
