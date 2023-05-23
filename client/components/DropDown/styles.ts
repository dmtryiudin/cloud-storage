import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const DropDownStyles = StyleSheet.create({
  fieldText: {
    fontFamily: "Manrope-Regular",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
  },
  field: {
    height: 40,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.blueGray,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  fieldFocused: {
    borderColor: Colors.blueGray3,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontFamily: "Manrope-SemiBold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textGray,
  },

  list: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.blueGray,
    paddingHorizontal: 10,
    overflow: "scroll",
  },
});
