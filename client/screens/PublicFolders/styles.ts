import { StyleSheet } from "react-native";

export const PublicFoldersStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: 14,
    gap: 20,
    backgroundColor: "white",
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
    color: "#047857",
    textAlign: "center",
  },
  loader: {
    marginVertical: 16,
    alignItems: "center",
  },
});
