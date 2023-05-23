import { View } from "react-native";
import { HeaderStyles } from "./styles";
import { UserIcon } from "../../components";

export const Header = () => {
  const { wrapper } = HeaderStyles;

  return (
    <View style={wrapper}>
      <UserIcon />
    </View>
  );
};
