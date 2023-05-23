import { StyleSheet } from "react-native";

export const ButtonStyles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#047857",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  buttonText: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    color: "white",
  },
  buttonSecondary: {
    backgroundColor: "#E7EAEE",
  },
  buttonDanger: {
    backgroundColor: "#EF4444",
  },
  buttonSecondaryText: {
    fontFamily: "Manrope-Medium",
    color: "#4B5768",
  },
});
