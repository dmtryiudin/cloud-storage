import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { InputStyles } from "./styles";
import { IInputProps } from "./types";

export const Input: React.FC<IInputProps> = ({ labelText, ...rest }) => {
  const { wrapper, label, input, inputFocused } = InputStyles;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const setFocus = () => {
    setIsFocused((prev) => !prev);
  };

  return (
    <View style={wrapper}>
      <Text style={label}>{labelText}</Text>
      <TextInput
        style={{ ...input, ...(isFocused ? inputFocused : {}) }}
        onFocus={setFocus}
        onBlur={setFocus}
        {...rest}
      />
    </View>
  );
};
