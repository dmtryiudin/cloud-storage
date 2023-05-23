import { StyleSheet } from "react-native";

export const UploadFileModalStyles = StyleSheet.create({
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
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
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
