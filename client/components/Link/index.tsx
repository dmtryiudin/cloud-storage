import { Text, TouchableOpacity } from "react-native";
import { LinkStyles } from "./styles";
import { ILinkProps } from "./types";

export const Link: React.FC<ILinkProps> = ({ textLabel, ...rest }) => {
  const { text } = LinkStyles;
  return (
    <TouchableOpacity {...rest}>
      <Text style={text}>{textLabel}</Text>
    </TouchableOpacity>
  );
};
