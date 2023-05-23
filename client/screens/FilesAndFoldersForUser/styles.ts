import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const FilesAndFoldersForUserStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: 14,
    minHeight: "100%",
    backgroundColor: Colors.white,
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

  headerButtonsWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
});
