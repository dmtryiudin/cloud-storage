import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const UploadFileModalStyles = StyleSheet.create({
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
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 5,
    gap: 14,
  },

  fileUpload: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
});
