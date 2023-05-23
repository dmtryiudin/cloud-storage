import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const ClientSettingsStyles = StyleSheet.create({
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 14,
    backgroundColor: Colors.white,
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
    color: Colors.textGray,
  },
  modal: {
    backgroundColor: Colors.modalBg,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentWrapper: {
    width: 300,
    height: 200,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  modalTextWrapper: {
    gap: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  modalText: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
    textAlign: "center",
  },
});
