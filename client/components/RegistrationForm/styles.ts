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
});