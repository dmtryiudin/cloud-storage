import { StyleSheet } from "react-native";

export const RegistrationFormStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  buttonsWrapper: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },

  buttonsWrapperWide: {
    justifyContent: "flex-end",
    gap: 14,
  },

  buttonWrapper: {
    width: "48%",
  },

  buttonWrapperWide: {
    width: "20%",
  },

  headingWrapper: {
    marginBottom: 24,
  },
  modalText: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: "#191D23",
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
  },
});
