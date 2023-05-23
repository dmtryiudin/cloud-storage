import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const FolderButtonStyles = StyleSheet.create({
  text: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
    textAlign: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    width: 100,
  },
});
