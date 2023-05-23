import { StyleSheet } from "react-native";

export const DeleteConfirmButtonStyles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
    backgroundColor: "white",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modalText: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: "#191D23",
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
