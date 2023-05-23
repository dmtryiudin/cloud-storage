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

  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  buttonsWrapper: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  buttonsWrapperWide: {
    justifyContent: "flex-start",
    gap: 14,
  },
  buttonWrapper: {
    width: "48%",
  },
  buttonWrapperWide: {
    width: "20%",
  },
});
