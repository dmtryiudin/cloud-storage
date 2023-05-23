import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const BanButtonStyles = StyleSheet.create({
  modalContentWrapper: {
    width: 300,
    height: 200,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 5,
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

  modal: {
    backgroundColor: Colors.modalBg,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
