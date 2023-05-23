import { StyleSheet } from "react-native";

export const DropDownStyles = StyleSheet.create({
  fieldText: {
    fontFamily: "Manrope-Regular",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    color: "#191D23",
  },
  field: {
    height: 40,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#A0ABBB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  fieldFocused: {
    borderColor: "#64748B",
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
    color: "#191D23",
  },

  list: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#A0ABBB",
    paddingHorizontal: 10,
    height: 200,
  },
});
