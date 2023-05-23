import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const FolderStyles = StyleSheet.create({
  wrapper: {
    minHeight: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: 14,
    backgroundColor: Colors.white,
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
  moveFileFromFolderArea: {
    width: 300,
    height: 70,
    borderRadius: 5,
    backgroundColor: Colors.primaryGreen,
    position: "absolute",
    bottom: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
  moveFileDanger: {
    backgroundColor: Colors.danger,
  },
  text: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.white,
  },
});
