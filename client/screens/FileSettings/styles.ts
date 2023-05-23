import { StyleSheet } from "react-native";

export const FileSettingsStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 14,
    gap: 20,
    backgroundColor: "white",
    minHeight: "100%",
  },

  wrapperWide: {
    padding: 50,
  },

  text: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: "#191D23",
  },

  publicSwitchWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  settingsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
});
