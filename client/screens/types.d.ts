import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Auth: undefined;
};

export type StackNavigation = StackNavigationProp<StackParamList>;
