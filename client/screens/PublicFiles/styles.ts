import { StyleSheet } from "react-native";

export const PublicFilesStyles = StyleSheet.create({
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  animatedFilter: {
    width: "100%",
    position: "absolute",
    top: 60,
    zIndex: 100,
    backgroundColor: "white",
  },
  animatedFilterList: {
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#A0ABBB",
    paddingHorizontal: 10,
    overflow: "scroll",
  },
  text: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: "#191D23",
  },
  textChosen: {
    color: "#047857",
    textDecorationLine: "underline",
  },
  filterTitleText: {
    fontFamily: "Manrope-Bold",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 22,
    color: "#191D23",
    marginVertical: 3,
  },
  filterSeparator: {
    width: "100%",
    marginVertical: 7,
    height: 1,
    backgroundColor: "#191D23",
  },
  filterItem: {
    marginVertical: 3,
  },
});
