import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const LoadingStyles = StyleSheet.create({
  loading: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 14,
  },
  text: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.white,
  },
  modal: {
    backgroundColor: Colors.modalBg,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
