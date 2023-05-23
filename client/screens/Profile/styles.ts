import { StyleSheet } from "react-native";

export const ProfileStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",

    padding: 14,
    gap: 20,
  },

  wrapperWide: {
    padding: 50,
  },

  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },

  nameWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    alignItems: "center",
  },
  nameText: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 27,
    color: "#191D23",
  },
  textInfo: {
    fontFamily: "Manrope-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 22,
    color: "#191D23",
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  scrollView: {
    backgroundColor: "white",
  },
});
