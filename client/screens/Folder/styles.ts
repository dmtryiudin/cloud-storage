import { StyleSheet } from "react-native";

export const FolderStyles = StyleSheet.create({
  wrapper: {
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "white",
  },

  wrapperWide: {
    padding: 50,
  },

  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  fileItem: {
    margin: 4,
  },
  headerButtonsWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
});
