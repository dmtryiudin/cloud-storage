import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const UserPreviewStyles = StyleSheet.create({
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 1000,
  },
  text: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    padding: 4,
  },
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
});
