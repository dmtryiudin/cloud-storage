import { StyleSheet } from "react-native";

export const BanButtonStyles = StyleSheet.create({
  modalContentWrapper: {
    width: 300,
    height: 200,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
