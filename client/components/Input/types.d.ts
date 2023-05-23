import { TextInput } from "react-native";

export interface IInputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  labelText: string;
}
