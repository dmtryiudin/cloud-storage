import { StyleSheet } from "react-native";

export const LoginFormStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: "100%",
  },
  buttonsWrapper: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },

  buttonWrapper: {
    width: "48%",
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

  headingWrapper: {
    marginBottom: 24,
  },
});
