import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const { heading } = styles;
  return <Text style={heading}>Hello</Text>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
