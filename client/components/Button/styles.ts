import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const ButtonStyles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: Colors.primaryGreen,
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
    color: Colors.white,
  },
  buttonSecondary: {
    backgroundColor: Colors.primaryGray,
  },
  buttonDanger: {
    backgroundColor: Colors.danger,
  },
  buttonSecondaryText: {
    fontFamily: "Manrope-Medium",
    color: Colors.blueGray2,
  },
});
