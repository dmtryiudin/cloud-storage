import { StyleSheet } from "react-native";

export const ProfileSettingsStyles = StyleSheet.create({
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

  inputsWrapper: {
    marginTop: 20,
  },
  headingWrapper: {
    marginBottom: 24,
  },
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
    color: "#191D23",
    textAlign: "center",
  },
  deleteButton: {
    marginTop: 14,
  },
});
