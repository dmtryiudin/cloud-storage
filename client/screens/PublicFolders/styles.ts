import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const PublicFoldersStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: 14,
    gap: 20,
    backgroundColor: Colors.white,
  },

  wrapperWide: {
    padding: 50,
  },
  header: {
    width: "100%",
  },
  fileItem: {
    margin: 4,
  },
  linkText: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.primaryGreen,
    textAlign: "center",
  },
  loader: {
    marginVertical: 16,
    alignItems: "center",
  },
});
