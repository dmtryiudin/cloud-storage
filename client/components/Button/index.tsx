import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { ButtonStyles } from "./styles";
import { IButtonProps } from "./types";

export const Button: React.FC<IButtonProps> = ({
  title,
  type = "primary",
  isLoading,
  ...rest
}) => {
  const {
    button,
    buttonSecondary,
    buttonText,
    buttonSecondaryText,
    buttonDanger,
  } = ButtonStyles;
  return (
    <TouchableOpacity
      style={{
        ...button,
        ...(type === "secondary" ? buttonSecondary : {}),
        ...(type === "danger" ? buttonDanger : {}),
      }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={type === "secondary" ? "black" : "white"} />
      ) : (
        <Text
          style={{
            ...buttonText,
            ...(type === "secondary" ? buttonSecondaryText : {}),
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
