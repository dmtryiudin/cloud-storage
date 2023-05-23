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

  buttonWrapper: {
    width: "48%",
  },

  headingWrapper: {
    marginBottom: 24,
  },
});
