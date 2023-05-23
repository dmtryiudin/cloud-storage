import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const DeleteConfirmButtonStyles = StyleSheet.create({
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modalText: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
    textAlign: "center",
  },
  buttonsWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  buttonWrapper: {
    width: "48%",
  },
});
