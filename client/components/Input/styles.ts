import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const InputStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  },
  label: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
  },
  errorText: {
    fontFamily: "Manrope-Light",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.danger,
  },
  input: {
    fontFamily: "Manrope-Regular",
    height: 40,
    width: "100%",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.blueGray,
  },

  inputFocused: {
    borderColor: Colors.blueGray3,
  },

  inputError: {
    borderColor: Colors.danger,
  },
});
