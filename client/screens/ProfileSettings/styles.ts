import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const ProfileSettingsStyles = StyleSheet.create({
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

  inputsWrapper: {
    marginTop: 20,
  },
  headingWrapper: {
    marginBottom: 24,
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
  deleteButton: {
    marginTop: 14,
  },
});
