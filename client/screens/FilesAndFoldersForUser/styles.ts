import { StyleSheet } from "react-native";

export const FilesAndFoldersForUserStyles = StyleSheet.create({
  wrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "white",
  },

  wrapperWide: {
    padding: 50,
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  fileItem: {
    margin: 4,
  },
});
