import { TouchableOpacity } from "react-native";

export interface IButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  title: string;
  type?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}
