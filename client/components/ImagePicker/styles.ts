import { StyleSheet } from "react-native";

export const ImagePickerStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    gap: 4,
  },

  image: {
    height: 200,
    width: 200,
    borderRadius: 5,
  },

  button: {
    width: 200,
  },
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
