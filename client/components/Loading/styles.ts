import { StyleSheet } from "react-native";

export const LoadingStyles = StyleSheet.create({
  loading: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 14,
  },
  text: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: "white",
  },
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
