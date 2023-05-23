import { StyleSheet } from "react-native";

export const AuthStyles = StyleSheet.create({
  link: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "white",
  },

  wrapperWide: {
    padding: 50,
  },

  text: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: "#191D23",
  },
});
