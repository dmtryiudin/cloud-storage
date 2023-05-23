import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const PublicFilesStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: 14,
    gap: 20,
    backgroundColor: Colors.white,
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
    color: Colors.primaryGreen,
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
    backgroundColor: Colors.white,
  },
  animatedFilterList: {
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.blueGray,
    paddingHorizontal: 10,
    overflow: "scroll",
  },
  text: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
  },
  textChosen: {
    color: Colors.primaryGreen,
    textDecorationLine: "underline",
  },
  filterTitleText: {
    fontFamily: "Manrope-Bold",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 22,
    color: Colors.textGray,
    marginVertical: 3,
  },
  filterSeparator: {
    width: "100%",
    marginVertical: 7,
    height: 1,
    backgroundColor: Colors.textGray,
  },
  filterItem: {
    marginVertical: 3,
  },
});
