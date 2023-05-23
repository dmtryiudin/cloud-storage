import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const SearchUsersStyles = StyleSheet.create({
  loader: {
    marginVertical: 16,
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 14,
    gap: 20,
    backgroundColor: Colors.white,
  },

  wrapperWide: {
    padding: 50,
  },
});
