import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const ErrorStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: Colors.white,
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    flexDirection: "row",
  },
  text: {
    fontFamily: "Manrope-Bold",
    fontStyle: "normal",
    fontSize: 22,
    lineHeight: 30,
    color: Colors.danger,
  },
});
