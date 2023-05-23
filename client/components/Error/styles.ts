import { StyleSheet } from "react-native";

export const ErrorStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
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
    color: "#EF4444",
  },
});
