import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const HeaderStyles = StyleSheet.create({
  wrapper: {
    height: 50,
    backgroundColor: Colors.primaryGreen,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
