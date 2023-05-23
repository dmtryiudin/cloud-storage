import { Text, TouchableOpacity } from "react-native";
import { ButtonStyles } from "./styles";
import { IButtonProps } from "./types";

export const Button: React.FC<IButtonProps> = ({
  title,
  type = "primary",
  ...rest
}) => {
  const { button, buttonSecondary, buttonText, buttonSecondaryText } =
    ButtonStyles;
  return (
    <TouchableOpacity
      style={{ ...button, ...(type === "secondary" ? buttonSecondary : {}) }}
      {...rest}
    >
      <Text
        style={{
          ...buttonText,
          ...(type === "secondary" ? buttonSecondaryText : {}),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
