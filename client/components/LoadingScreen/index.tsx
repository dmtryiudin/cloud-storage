import { ActivityIndicator, View } from "react-native";
import { LoadingScreenStyles } from "./styles";

export const LoadingScreen = () => {
  const { wrapper } = LoadingScreenStyles;
  return (
    <View style={wrapper}>
      <ActivityIndicator size="large" />
    </View>
  );
};
