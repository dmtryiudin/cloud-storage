import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { conditionStyles } from "../../utils/conditionStyles";
import { InputStyles } from "./styles";
import { IInputProps } from "./types";

export const Input: React.FC<IInputProps> = ({
  labelText,
  error,
  required = false,
  ...rest
}) => {
  const { wrapper, label, input, inputFocused, inputError, errorText } =
    InputStyles;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const setFocus = () => {
    setIsFocused((prev) => !prev);
  };

  return (
    <View style={wrapper}>
      <Text style={label}>
        {labelText}
        {required ? " *" : ""}
      </Text>
      <TextInput
        style={{
          ...input,
          ...conditionStyles(inputFocused, isFocused),
          ...conditionStyles(inputError, !!error),
        }}
        onFocus={setFocus}
        onBlur={setFocus}
        {...rest}
      />
      <Text style={errorText}>{error ? error : " "}</Text>
    </View>
  );
};
