import { StyleSheet } from "react-native";

export const ClientSettingsStyles = StyleSheet.create({
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",

    padding: 14,
    backgroundColor: "white",
  },

  wrapperWide: {
    padding: 50,
  },

  itemWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: "#191D23",
  },
});
