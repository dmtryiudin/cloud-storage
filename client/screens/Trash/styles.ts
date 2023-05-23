import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const TrashStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 14,
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
});
