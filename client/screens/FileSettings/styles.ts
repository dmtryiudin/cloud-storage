import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const FileSettingsStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 14,
    gap: 20,
    backgroundColor: Colors.white,
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
    color: Colors.textGray,
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

  modalText: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
    textAlign: "center",
  },

  modalTextWrapper: {
    gap: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },

  modalContentWrapper: {
    width: 300,
    height: 200,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  modal: {
    backgroundColor: Colors.modalBg,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
