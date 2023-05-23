import { StyleSheet } from "react-native";

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
    color: "#191D23",
  },
  errorText: {
    fontFamily: "Manrope-Light",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: "#DC2626",
  },
  input: {
    fontFamily: "Manrope-Regular",
    height: 40,
    width: "100%",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: "#191D23",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#A0ABBB",
  },

  inputFocused: {
    borderColor: "#64748B",
  },

  inputError: {
    borderColor: "#EF4444",
  },
});
