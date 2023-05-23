import { HeadingStyles } from "./style";
import { IHeadingProps } from "./types";
import { Text } from "react-native";

export const Heading: React.FC<IHeadingProps> = ({ label }) => {
  const { heading } = HeadingStyles;
  return <Text style={heading}>{label}</Text>;
};
